'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { sha256 } from '@/utils/hash';

export default function ConsertoConfirmadoPage() {
  useEffect(() => {
    const sendConfirmationEvent = async () => {
      const email = 'cliente@exemplo.com'; // ⚠️ Substitua com dados reais se disponível
      const whatsapp = '5538984184684';     // ⚠️ Substitua com dados reais se disponível

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
            content_name: 'Conserto de Celular',
            content_category: 'Serviço de Conserto',
            status: 'confirmed',
          },
        }),
      });

      console.log('[Meta] Evento "Confirmation" enviado com hash ✅');
    };

    sendConfirmationEvent();
  }, []);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center text-white px-4 py-8">
      <div className="bg-gray-800 p-8 rounded-xl shadow-2xl text-center max-w-md w-full border border-yellow-400/30">
        {/* Ícone de sucesso */}
        <div className="mb-6">
          <svg className="w-16 h-16 mx-auto text-yellow-400 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>

        <h1 className="text-4xl font-bold text-yellow-400 mb-4">Agendamento Confirmado!</h1>
        <p className="text-lg mb-6">
          Seu conserto está agendado com o <strong>Mestre dos Celulares</strong>! 🚀 Entraremos em contato no dia marcado.
        </p>

        {/* Prova Social */}
        <div className="bg-gray-700 p-4 rounded-lg mb-6 shadow-md">
          <p className="text-sm italic">
            {"Troquei minha tela com o Marllon e ficou perfeita! Super rápido! - Ana C."}
          </p>
        </div>

        {/* CTA WhatsApp */}
        <Link
          href="https://wa.me/5538984184684?text=Oi%20Marllon,%20acabei%20de%20agendar%20um%20conserto!%20Quero%20saber%20mais%20detalhes."
          className="inline-block bg-gradient-to-r from-yellow-400 to-yellow-600 text-black py-3 px-8 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
        >
          Fale comigo no WhatsApp 📲
        </Link>

        {/* Incentivo Extra */}
        <p className="text-sm mt-4 text-gray-400">
          💡 Fale agora e garanta <strong>10% de desconto</strong> no próximo serviço!
        </p>
      </div>
    </div>
  );
}
