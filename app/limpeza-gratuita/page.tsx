'use client';

import React from 'react';
import Image from 'next/image';
import Scheduler from '@/components/common/Scheduler';
import Headline from '@/components/common/limpeza-gratuita/Headline';
import VideoPlayer from '@/components/common/limpeza-gratuita/VideoPlayer';
import Footer from '@/components/common/Footer';

const LimpezaGratuitaPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white flex flex-col">
      {/* Cabeçalho */}
      <header className="text-center py-8">
        <div className="inline-block">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-yellow-600">
            Marllon Celulares
          </h1>
          <p className="text-xl md:text-2xl font-semibold">
            Limpeza Gratuita com o Mestre dos Celulares!
          </p>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <main className="flex-1 max-w-4xl mx-auto px-4">
        <Headline />

        <VideoPlayer />

        {/* Benefícios */}
        <section className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
              <p className="text-yellow-400 text-2xl mb-2">🕒</p>
              <p className="text-lg font-semibold">Limpeza em 15 minutos</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
              <p className="text-yellow-400 text-2xl mb-2">✅</p>
              <p className="text-lg font-semibold">Diagnóstico grátis</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
              <p className="text-yellow-400 text-2xl mb-2">💡</p>
              <p className="text-lg font-semibold">Dicas de manutenção</p>
            </div>
          </div>
        </section>

        {/* Prova Social */}
        <section className="text-center mb-12">
          <p className="italic text-lg bg-gray-800 p-4 rounded-lg shadow-md">
            {"Meu celular estava superaquecendo, e a limpeza resolveu tudo! - João P."}
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
            Oi, eu sou o Marllon! Vou deixar seu celular como novo com uma limpeza externa gratuita. Agende agora!
          </p>
        </section>

        {/* Agendamento */}
        <Scheduler service="limpeza-gratuita" />
      </main>

      <Footer />
    </div>
  );
};

export default LimpezaGratuitaPage;
