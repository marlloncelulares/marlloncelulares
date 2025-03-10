onSubmit={async (e) => {
  e.preventDefault();
  try {
    const response = await fetch('/api/quiz', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        whatsapp: formData.whatsapp,
        answers,
      }),
    });

    if (response.ok) {
      await fetch('/api/meta-events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event_name: 'CompleteRegistration',
          event_time: Math.floor(Date.now() / 1000),
          user_data: {
            lead_name: formData.name,
            lead_email: formData.email,
            lead_whatsapp: formData.whatsapp,
          },
          custom_data: { content_name: 'Quiz' },
        }),
      });

      alert('Obrigado por participar! Verifique seu e-mail.');
      localStorage.removeItem('quizFormData');
      router.push('/note-13-pro');
    } else {
      alert('Erro ao enviar os dados. Tente novamente mais tarde.');
    }
  } catch (error) {
    alert('Erro ao enviar os dados. Tente novamente mais tarde.');
  }
}}
