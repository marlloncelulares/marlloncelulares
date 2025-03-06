const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID;

interface EventData {
  event_name: string;
  event_time: number;
  event_source_url?: string;
  user_data?: {
    email?: string;
    phone?: string;
  };
}

export async function sendConversionEvent(eventData: EventData) {
  const res = await fetch(`https://graph.facebook.com/v19.0/${FB_PIXEL_ID}/events`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.FB_ACCESS_TOKEN}`,
    },
    body: JSON.stringify({ data: [eventData] }),
  });

  if (!res.ok) {
    const error = await res.json();
    console.error("Erro ao enviar evento ao Meta:", error);
    throw new Error(`Erro ao enviar evento: ${error.message}`);
  }

  return res.json();
}
