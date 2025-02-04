import { NextResponse } from 'next/server';

const ALLOWED_EVENTS = [
  'ViewContent',
  'Search',
  'AddToWishlist',
  'AddToCart',
  'InitiateCheckout',
  'AddPaymentInfo',
  'Purchase',
  'Subscribe',
  'StartTrial',
  'CompleteRegistration',
  'Contact',
  'FindLocation',
  'Schedule',
];

export async function POST(request: Request) {
  try {
    const { NEXT_PUBLIC_FACEBOOK_PIXEL_ID, FACEBOOK_ACCESS_TOKEN } = process.env;

    // Verificar se o Pixel ID e o Token estão configurados
    if (!NEXT_PUBLIC_FACEBOOK_PIXEL_ID || !FACEBOOK_ACCESS_TOKEN) {
      return NextResponse.json(
        { error: 'Configuração do Pixel ou Token de Acesso ausente.' },
        { status: 500 }
      );
    }

    // Obter os dados enviados pelo cliente
    const eventData = await request.json();

    // Validar o evento
    const { event_name, event_time, user_data, custom_data } = eventData;

    if (!event_name || !ALLOWED_EVENTS.includes(event_name)) {
      return NextResponse.json(
        { error: `Evento inválido ou não permitido: ${event_name}` },
        { status: 400 }
      );
    }

    // Construir o payload do evento
    const payload = {
      data: [
        {
          event_name,
          event_time: event_time || Math.floor(Date.now() / 1000),
          user_data: user_data || {}, // Ex.: hashed_email, hashed_phone
          custom_data: custom_data || {}, // Ex.: value, currency, items
        },
      ],
    };

    // Enviar para a API de Conversões da Meta
    const response = await fetch(
      `https://graph.facebook.com/v13.0/${NEXT_PUBLIC_FACEBOOK_PIXEL_ID}/events`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${FACEBOOK_ACCESS_TOKEN}`,
        },
        body: JSON.stringify(payload),
      }
    );

    // Verificar a resposta da API
    if (!response.ok) {
      const errorResponse = await response.json();
      console.error('Erro da API de Conversões:', errorResponse);
      return NextResponse.json(
        { error: 'Erro ao enviar evento para a API de Conversões', details: errorResponse },
        { status: response.status }
      );
    }

    const responseData = await response.json();
    return NextResponse.json({ success: true, response: responseData });
  } catch (error) {
    // Verificar se o erro é uma instância de Error
    if (error instanceof Error) {
      console.error('Erro no processamento do evento:', error.message);
      return NextResponse.json(
        { error: 'Erro interno no servidor', details: error.message },
        { status: 500 }
      );
    }

    // Caso o erro não seja uma instância de Error
    console.error('Erro inesperado:', error);
    return NextResponse.json(
      { error: 'Erro interno no servidor', details: 'Erro desconhecido' },
      { status: 500 }
    );
  }
}
