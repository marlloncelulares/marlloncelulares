'use client';

import Link from "next/link";
import { useEffect } from "react";
import { sha256 } from "@/utils/hash";

export default function ConsertoConfirmacaoPage() {
  // Enviar evento CompleteRegistration para o Meta Pixel
  useEffect(() => {
    const sendMetaEvent = async () => {
      try {
        // Simulando dados do cliente (em um cenário real, você pode passar esses dados via query params ou contexto)
        const email = "cliente@exemplo.com"; // Substitua por dados reais se disponíveis
        const whatsapp = "5538984184684"; // Substitua por dados reais se disponíveis
        const hashedEmail = await sha256(email);
        const hashedPhone = await sha256(whatsapp);

        await fetch('/api/meta-events', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            event_name: 'CompleteRegistration',
            event_time: Math.floor(Date.now() / 1000),
            user_data: {
              em: hashedEmail,
              ph: hashedPhone,
              client_user_agent: navigator.userAgent,
            },
            custom_data: {
              content_name: 'Conserto de Celular - Confirmação Final',
              content_category: 'Serviço de Conserto',
              registration_method: 'website',
            },
          }),
        });

        console.log('[Meta] Evento CompleteRegistration enviado com sucesso!');
      } catch (error) {
        console.error('Erro ao enviar evento CompleteRegistration:', error);
      }
    };

    sendMetaEvent();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 flex items-center justify-center text-white px-4 py-8">
      <div className="bg-[#1a1a1a] p-8 rounded-xl shadow-2xl text-center max-w-lg w-full border border-gray-700">
        {/* Logo ou Ícone */}
        <div className="mb-6">
          <img src="/images/logo.png" alt="Marllon Celulares" className="w-24 h-24 rounded-full mx-auto border-2 border-yellow-500" />
        </div>

        <h1 className="text-4xl font-bold text-yellow-500 mb-4 font-sora">Você está na família Marllon Celulares!</h1>
        <p className="text-lg mb-6 font-sora">
          Seu agendamento foi concluído com sucesso. Agora você faz parte da nossa comunidade de clientes satisfeitos! 🎉
        </p>

        {/* Prova Social */}
        <div className="bg-gray-800 p-4 rounded-lg mb-6">
          <p className="text-sm italic">"O Marllon consertou meu celular em menos de 1 hora! Melhor atendimento que já tive! - João S."</p>
        </div>

        {/* CTA 1: Conhecer Outros Serviços */}
        <div className="mb-4">
          <Link
            href="/limpeza-gratuita"
            className="bg-yellow-500 text-black py-3 px-8 rounded-full inline-flex items-center gap-2 hover:bg-yellow-600 transition-all font-sora font-semibold text-lg"
          >
            Conheça nossa Limpeza Gratuita 🧼
          </Link>
        </div>

        {/* CTA 2: Compartilhar Experiência */}
        <div>
          <Link
            href="https://wa.me/5538984184684?text=Oi%20Marllon,%20acabei%20de%20agendar%20um%20conserto%20e%20gostei%20muito%20do%20processo!"
            className="bg-gray-700 text-white py-3 px-8 rounded-full inline-flex items-center gap-2 hover:bg-gray-600 transition-all font-sora font-semibold text-lg"
          >
            Como foi sua experiência? 💬
          </Link>
        </div>

        {/* Texto de Confiança */}
        <p className="text-sm mt-6 text-gray-400 font-sora">
          Estamos aqui para cuidar do seu celular com a melhor qualidade. Qualquer dúvida, estamos a um clique de distância!
        </p>
      </div>
    </div>
  );
}
