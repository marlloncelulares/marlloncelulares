'use client';

import React from 'react';
import Image from 'next/image'; // Importar o componente Image
import Scheduler from '@/components/common/limpeza-gratuita/Scheduler';
import Footer from '@/components/common/limpeza-gratuita/Footer';
import Logo from '@/components/common/limpeza-gratuita/Logo';

const ConsertoPage: React.FC = () => {
  return (
    <div className="bg-black flex flex-col justify-between min-h-screen">
      <div>
        <div className="bg-yellow-500 text-xl text-black text-center py-4 font-bold">
          As vagas pra essa semana já estão se esgotando...
        </div>
        <Logo />
        <div className="text-center text-white py-6">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Marllon Celulares - Conserto Rápido com o Mestre dos Celulares!
          </h1>
          <p className="text-lg md:text-xl">
            Tela quebrada, bateria fraca ou celular lento? Resolva tudo hoje com diagnóstico grátis e conserto no mesmo dia!
          </p>
        </div>

        {/* Benefícios */}
        <section className="max-w-3xl mx-auto my-6 px-4">
          <ul className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <li className="bg-yellow-500 text-black p-4 rounded-md text-center">
              Conserto em até 1 hora 🕒
            </li>
            <li className="bg-yellow-500 text-black p-4 rounded-md text-center">
              Garantia de 90 dias ✅
            </li>
            <li className="bg-yellow-500 text-black p-4 rounded-md text-center">
              Peças de qualidade 🔧
            </li>
          </ul>
        </section>

        {/* Prova Social */}
        <section className="max-w-3xl mx-auto my-6 text-center text-white px-4">
          <p className="italic text-lg">
            {"Troquei minha tela com o Marllon e ficou perfeita! Super rápido! - Ana C."}
          </p>
        </section>

        {/* Sobre */}
        <section className="max-w-3xl mx-auto my-6 text-center text-white px-4">
          <Image
            src="/images/logo.png"
            alt="Marllon"
            width={128}
            height={128}
            className="rounded-full mx-auto mb-4"
          />
          <p className="text-lg">
            Oi, eu sou o Marllon! Apaixonado por tecnologia, vou cuidar do seu celular como se fosse o meu. Vamos resolver isso juntos?
          </p>
        </section>

        <Scheduler />
      </div>
      <Footer />
    </div>
  );
};

export default ConsertoPage;
