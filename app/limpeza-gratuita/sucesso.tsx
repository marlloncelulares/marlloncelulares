'use client';

import { useEffect } from 'react';

const SucessoPage = () => {
  useEffect(() => {
    fetch('/api/meta-events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event_name: 'Confirmation',
        event_time: Math.floor(Date.now() / 1000),
        user_data: {
          email: 'email@cliente.com', // substitua dinamicamente se quiser
          phone: '5538984184684',
        },
        custom_data: {
          content_name: 'Limpeza Gratuita',
          content_category: 'Serviço de Limpeza',
          status: 'confirmed',
        },
      }),
    });
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[var(--dark-blue)] text-[var(--text-color-two)] px-4 py-12">
      <div className="max-w-xl w-full text-center space-y-6 bg-[var(--light-blue)] p-8 rounded-xl shadow-lg border border-[var(--yellow)]">
        <h1 className="text-4xl md:text-5xl font-bold gradient-text">
          Agendamento Confirmado ✅
        </h1>

        <p className="text-lg leading-relaxed">
          Obrigado por agendar sua <strong>Limpeza Gratuita</strong> com a <strong>Marllon Celulares</strong>.
          Te esperamos na data combinada! Se tiver dúvidas ou quiser antecipar, é só chamar no WhatsApp. 💬
        </p>

        <a
          href="https://wa.me/5538984184684?text=Olá!%20Gostaria%20de%20confirmar%20detalhes%20do%20meu%20agendamento."
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-[var(--button-color-three)] text-[var(--text-color-two)] px-6 py-3 rounded-lg font-bold text-lg hover:bg-[var(--button-color-four)] transition-all duration-300"
        >
          Falar com a Marllon no WhatsApp
        </a>

        <div className="pt-4">
          <button
            onClick={() => window.location.href = '/'}
            className="text-sm text-[var(--button-text-color-two)] hover:underline"
          >
            Voltar para o início
          </button>
        </div>
      </div>
    </div>
  );
};

export default SucessoPage;
