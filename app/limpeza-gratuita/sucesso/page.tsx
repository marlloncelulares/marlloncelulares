'use client';

import { useEffect } from 'react';
import { sha256 } from '@/utils/hash';

const SucessoPage = () => {
  useEffect(() => {
    const sendConfirmationEvent = async () => {
      const email = 'email@cliente.com';
      const whatsapp = '5538984184684';

      const hashedEmail = await sha256(email);
      const hashedPhone = await sha256(whatsapp);

      await fetch('/api/meta-events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event_name: 'Confirmation',
          event_time: Math.floor(Date.now() / 1000),
          user_data: {
            em: hashedEmail,
            ph: hashedPhone,
            client_user_agent: navigator.userAgent,
          },
          custom_data: {
            content_name: 'Limpeza Gratuita',
            content_category: 'Serviço de Limpeza',
            status: 'confirmed',
          },
        }),
      });
    };

    sendConfirmationEvent();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6 py-16 text-center space-y-6">
      <h1 className="text-4xl font-bold text-yellow-500">Agendamento Confirmado ✅</h1>
      <p className="text-lg max-w-xl">
        Obrigado por agendar com a <strong>Marllon Celulares</strong>. Se tiver dúvidas, fale conosco no WhatsApp.
      </p>
      <a
        href="https://wa.me/5538984184684"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded font-bold text-lg transition-all"
      >
        Falar com a Marllon no WhatsApp
      </a>
    </div>
  );
};

export default SucessoPage;
