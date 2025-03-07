import { NextResponse } from 'next/server';

const ALLOWED_EVENTS = [
  'ViewContent', 'Search', 'AddToWishlist', 'AddToCart', 'InitiateCheckout',
  'AddPaymentInfo', 'Purchase', 'Subscribe', 'StartTrial', 'CompleteRegistration',
  'Contact', 'FindLocation', 'Schedule',
];

export async function POST(request: Request) {
  try {
    const NEXT_PUBLIC_FACEBOOK_PIXEL_ID = "613504194811333";
    const FACEBOOK_ACCESS_TOKEN = "EAAiVod5ZBBlgBOyz8tIqEemtltezKakQ47Ani09mbMptyMy8WMrunyuWOcTjZBt8OzbMHJbjBT9ZAZBZB6afIWjGNNXZAUjHjcR6g9DZA4zmr0wJ8Me6oApg4vsskZB4zBWOWEfFuWjhLjvZCib2WiNbIz7LJ2gTDRNtKUb4bzq0ULPVqTaSZBD7pKAmLZCLkDEzCclvwZDZD";

    if (!NEXT_PUBLIC_FACEBOOK_PIXEL_ID || !FACEBOOK_ACCESS_TOKEN) {
      return NextResponse.json(
        { error: 'Configuração do Pixel ou Token de Acesso ausente.' },
        { status: 500 }
      );
    }

    const eventData = await request.json();
    const { event_name, event_time, user_data, custom_data } = eventData;

    if (!event_name || !ALLOWED_EVENTS.includes(event_name)) {
      return NextResponse.json(
        { error: `Evento inválido ou não permitido: ${event_name}` },
        { status: 400 }
      );
    }

    const payload = {
      data: [
        {
          event_name,
          event_time: event_time || Math.floor(Date.now() / 1000),
          user_data: user_data || {},
          custom_data: custom_data || {},
          action_source: "website",
        },
      ],
      access_token: FACEBOOK_ACCESS_TOKEN,
    };

    const response = await fetch(
      `https://graph.facebook.com/v13.0/${NEXT_PUBLIC_FACEBOOK_PIXEL_ID}/events`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }
    );

    if (!response.ok) {
      const errorResponse = await response.json();
      return NextResponse.json(
        { error: 'Erro ao enviar evento para a API de Conversões', details: errorResponse },
        { status: response.status }
      );
    }

    const responseData = await response.json();
    return NextResponse.json({ success: true, response: responseData });

  } catch (error) {
    console.error('Erro no processamento do evento:', error);
    return NextResponse.json(
      { error: 'Erro interno no servidor', details: error instanceof Error ? error.message : 'Erro desconhecido' },
      { status: 500 }
    );
  }
}
