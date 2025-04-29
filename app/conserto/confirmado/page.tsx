'use client';

import React, { useEffect } from 'react';

const ConfirmadoPage: React.FC = () => {
  useEffect(() => {
    const sendConfirmationEvent = async () => {
      try {
        await fetch('/api/meta-events', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            event_name: 'Confirmation',
            event_time: Math.floor(Date.now() / 1000),
            user_data: {
              client_user_agent: navigator.userAgent,
            },
            custom_data: {
              content_name: 'Conserto de Celular',
              content_category: 'Serviço de Conserto',
            },
          }),
        });
        console.log(`[Meta] Evento "Confirmation" enviado com sucesso ✅`);
      } catch (error) {
        console.error('Erro ao enviar evento Confirmation:', error);
      }
    };

    sendConfirmationEvent();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4 py-8">
      <div className="max-w-md text-center">
        <div className="mb-6">
          <span className="text-4xl">✅</span>
          <h1 className="text-3xl md:text-4xl font-bold mt-4">Agendamento Confirmado!</h1>
        </div>

        <p className="text-lg md:text-xl mb-6">
          Seu conserto está agendado com o Mestre dos Celulares! Entraremos em contato no dia marcado.
        </p>

        <p className="italic text-lg bg-[#333] p-4 rounded-lg mb-6">
          Troquei minha tela com o Marllon e ficou perfeita! Super rápido! - Ana C.
        </p>

        <p className="text-lg mb-6">
          Caso precise falar comigo,{' '}
          <a
            href="https://wa.me/5538984184684"
            className="text-yellow-400 underline hover:text-yellow-500"
            target="_blank"
            rel="noopener noreferrer"
          >
            clique aqui
          </a>{' '}
          para me chamar no WhatsApp!
        </p>

        <p className="text-sm italic">
          Fale agora e garanta 10% de desconto no próximo serviço!
        </p>
      </div>
    </div>
  );
};

export default ConfirmadoPage;
