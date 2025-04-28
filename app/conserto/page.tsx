'use client';

import React from 'react';
import Image from 'next/image';
import Scheduler from '@/components/common/limpeza-gratuita/Scheduler';

const ConsertoPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Cabeçalho */}
      <header className="text-center py-8">
        <div className="inline-block">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-yellow-600">
            Marllon Celulares
          </h1>
          <p className="text-xl md:text-2xl font-semibold">
            Conserto Rápido com o Mestre dos Celulares!
          </p>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <main className="flex-1 max-w-4xl mx-auto px-4">
        <section className="text-center mb-12">
          <p className="text-lg md:text-xl mb-6">
            Tela quebrada, bateria fraca ou celular lento? Resolva tudo hoje com diagnóstico grátis e conserto no mesmo dia!
          </p>
        </section>

        {/* Benefícios */}
        <section className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-[#333] p-6 rounded-lg shadow-lg">
              <p className="text-white text-2xl mb-2">🕒</p>
              <p className="text-lg font-semibold">Conserto em até 1 hora</p>
            </div>
            <div className="bg-[#333] p-6 rounded-lg shadow-lg">
              <p className="text-white text-2xl mb-2">✅</p>
              <p className="text-lg font-semibold">Garantia de 90 dias</p>
            </div>
            <div className="bg-[#333] p-6 rounded-lg shadow-lg">
              <p className="text-white text-2xl mb-2">🔧</p>
              <p className="text-lg font-semibold">Peças de qualidade</p>
            </div>
          </div>
        </section>

        {/* Prova Social */}
        <section className="text-center mb-12">
          <p className="italic text-lg bg-[#333] p-4 rounded-lg shadow-md">
            {"Troquei minha tela com o Marllon e ficou perfeita! Super rápido! - Ana C."}
          </p>
        </section>

        {/* Sobre */}
        <section className="text-center mb-12">
          <Image
            src="/images/logo.png"
            alt="Marllon"
            width={128}
            height={128}
            className="rounded-full mx-auto mb-4 border-4 border-yellow-400 shadow-lg"
          />
          <p className="text-lg">
            Oi, eu sou o Marllon! Apaixonado por tecnologia, vou cuidar do seu celular como se fosse o meu. Vamos resolver isso juntos?
          </p>
        </section>

        {/* Agendamento */}
        <Scheduler service="conserto" />
      </main>

      {/* Rodapé */}
      <footer className="bg-black text-center py-6">
        <p className="text-sm">© 2025 Marllon Celulares. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};

export default ConsertoPage;
