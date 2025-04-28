'use client';

import React from 'react';
import Scheduler from '@/components/common/limpeza-gratuita/Scheduler';
import Headline from '@/components/common/limpeza-gratuita/Headline';
import VideoPlayer from '@/components/common/limpeza-gratuita/VideoPlayer';
import Footer from '@/components/common/limpeza-gratuita/Footer';

const LimpezaGratuitaPage: React.FC = () => {
  return (
    <div className="bg-black text-white">
      <Headline />
      <VideoPlayer />
      <Scheduler service="limpeza-gratuita" />
      <Footer />
    </div>
  );
};

export default LimpezaGratuitaPage;
