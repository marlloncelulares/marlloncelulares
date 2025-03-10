import { NextResponse } from 'next/server';

const PIXEL_ID = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID;
const ACCESS_TOKEN = process.env.FACEBOOK_ACCESS_TOKEN;

export async function POST(request: Request) {
  try {
    const { event_name, event_time, user_data, custom_data } = await request.json();

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
    };

    const response = await fetch(`https://graph.facebook.com/v19.0/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorDetails = await response.json();
      return NextResponse.json(
        { error: 'Erro ao enviar evento ao Meta', details: errorDetails },
        { status: response.status }
      );
    }

    const responseData = await response.json();
    return NextResponse.json({ success: true, response: responseData });

  } catch (error) {
    console.error('Erro na rota meta-events:', error);
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 });
  }
}
