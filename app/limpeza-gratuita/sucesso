'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const SucessoPage: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    // Dispara o evento de confirmação após a navegação
    fetch('/api/meta-events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event_name: 'Confirmation',
        event_time: Math.floor(Date.now() / 1000),
        user_data: {
          email: 'email@cliente.com',  // Substitua com dados reais
          phone: '5538984184684',      // Substitua com dados reais
        },
        custom_data: {
          content_name: 'Limpeza Gratuita',
          content_category: 'Serviço de Limpeza',
          lead_name: 'Nome do Cliente',  // Substitua com dados reais
          lead_email: 'email@cliente.com', // Substitua com dados reais
          lead_whatsapp: '5538984184684',  // Substitua com dados reais
          appointment_date: '2025-04-03',  // Substitua com dados reais
          appointment_time: '15:00',      // Substitua com dados reais
        },
      }),
    });
  }, []);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4 py-16 text-center space-y-6">
      <h1 className="text-4xl font-bold text-yellow-500">Agendamento Confirmado ✅</h1>
      <p className="text-lg max-w-xl">
        Obrigado por agendar sua <strong>Limpeza Gratuita</strong> com a <strong>Marllon Celulares</strong>.
        Nos vemos em breve! Se tiver dúvidas, fale com a gente pelo WhatsApp. 💬
      </p>
      <a
        href="https://wa.me/5538984184684?text=Olá!%20Gostaria%20de%20confirmar%20detalhes%20do%20meu%20agendamento."
        className="bg-green-500 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-green-600 transition"
        target="_blank"
      >
        Falar com a Marllon no WhatsApp
      </a>
    </div>
  );
};

export default SucessoPage;
