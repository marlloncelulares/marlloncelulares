'use client';

import React from 'react';
import Headline from '@/components/common/limpeza-gratuita/Headline';
import VideoPlayer from '@/components/common/limpeza-gratuita/VideoPlayer';
import Scheduler from '@/components/common/limpeza-gratuita/Scheduler';
import Footer from '@/components/common/limpeza-gratuita/Footer';
import Logo from '@/components/common/limpeza-gratuita/Logo';

const LimpezaGratuitaPage: React.FC = () => {
  return (
    <div className="bg-black flex flex-col justify-between">
      <div>
        <div className="bg-yellow-500 text-xl text-black text-center py-4 font-bold">
          As vagas pra essa semana já estão se esgotando...
        </div>
        <Logo />
        <Headline />
        <VideoPlayer />
        <Scheduler />
      </div>
      <Footer />
    </div>
  );
};

export default LimpezaGratuitaPage;
