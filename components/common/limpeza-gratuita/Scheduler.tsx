const sendMetaEvent = async () => {
  const payload = {
    event_name: 'Schedule',
    event_time: Math.floor(Date.now() / 1000),
    user_data: {
      lead_name: name,
      lead_email: email,
      lead_whatsapp: whatsapp,
    },
    custom_data: {
      content_name: 'Limpeza Gratuita',
      content_category: 'Serviços',
      appointment_date: date?.toISOString().split('T')[0],
      appointment_time: selectedTime,
    },
  };

  try {
    await fetch('/api/meta-events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    console.log('Evento Schedule enviado com sucesso!');
  } catch (error) {
    console.error('Erro ao enviar evento Schedule:', error);
  }
};
