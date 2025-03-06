'use client';
import React, { useEffect } from 'react';
import { sendConversionEvent } from '@/lib/integrations/meta-conversion';
import Headline from '@/components/common/limpeza-gratuita/Headline';
import VideoPlayer from '@/components/common/limpeza-gratuita/VideoPlayer';
import Scheduler from '@/components/common/limpeza-gratuita/Scheduler';
import Footer from '@/components/common/limpeza-gratuita/Footer';
import Logo from '@/components/common/limpeza-gratuita/Logo';

const LimpezaGratuitaPage: React.FC = () => {
  useEffect(() => {
    sendConversionEvent({
      event_name: 'PageView',
      event_time: Math.floor(Date.now() / 1000),
      event_source_url: window.location.href,
    });
  }, []);

  const handleSchedule = () => {
    sendConversionEvent({
      event_name: 'Schedule',
      event_time: Math.floor(Date.now() / 1000),
      event_source_url: window.location.href,
    });
  };

  return (
    <div className="bg-black flex flex-col justify-between">
      <div>
        <div className="bg-yellow-500 text-xl text-black text-center py-4 font-bold">
          As vagas pra essa semana já estão se esgotando...
        </div>
        <Logo />
        <Headline />
        <VideoPlayer />
        <Scheduler onSchedule={handleSchedule} />
      </div>
      <Footer />
    </div>
  );
};

export default LimpezaGratuitaPage;
