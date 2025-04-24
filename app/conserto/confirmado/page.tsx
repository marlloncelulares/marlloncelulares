'use client';

import Link from "next/link";
import { useEffect } from "react";
import { motion } from "framer-motion";

export default function ConsertoConfirmadoPage() {
  // Animação para o container principal
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  // Animação para o botão CTA
  const buttonVariants = {
    hover: { scale: 1.05, transition: { duration: 0.3 } },
    tap: { scale: 0.95 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 flex items-center justify-center text-white px-4 py-8">
      <motion.div
        className="bg-[#1a1a1a] p-8 rounded-xl shadow-2xl text-center max-w-md w-full border border-gray-700"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Ícone de sucesso */}
        <div className="mb-6">
          <svg className="w-16 h-16 mx-auto text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>

        <h1 className="text-4xl font-bold text-yellow-500 mb-4 font-sora">Agendamento Confirmado!</h1>
        <p className="text-lg mb-6 font-sora">
          Seu conserto está agendado com o <strong>Mestre dos Celulares</strong>! 🚀 Entraremos em contato no dia marcado.
        </p>

        {/* Prova Social */}
        <div className="bg-gray-800 p-4 rounded-lg mb-6">
          <p className="text-sm italic">"Troquei minha tela com o Marllon e ficou perfeita! Super rápido! - Ana C."</p>
        </div>

        {/* CTA WhatsApp */}
        <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
          <Link
            href="https://wa.me/5538984184684?text=Oi%20Marllon,%20acabei%20de%20agendar%20um%20conserto!%20Quero%20saber%20mais%20detalhes."
            className="bg-yellow-500 text-black py-3 px-8 rounded-full inline-flex items-center gap-2 hover:bg-yellow-600 transition-all font-sora font-semibold text-lg"
          >
            Fale comigo no WhatsApp 📲
          </Link>
        </motion.div>

        {/* Incentivo Extra */}
        <p className="text-sm mt-4 text-gray-400 font-sora">
          💡 Fale agora e garanta <strong>10% de desconto</strong> no próximo serviço!
        </p>
      </motion.div>
    </div>
  );
}
