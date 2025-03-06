'use client';

import React, { useEffect } from 'react';
import { sendConversionEvent } from '@/lib/integrations/meta-conversion';
import QuizQuestion from '@/components/common/quiz/QuizQuestion';

const QuizPage: React.FC = () => {
  useEffect(() => {
    sendConversionEvent({
      event_name: 'PageView',
      event_time: Math.floor(Date.now() / 1000),
      event_source_url: window.location.href,
    });
  }, []);

  const handleQuizComplete = (email: string) => {
    sendConversionEvent({
      event_name: 'Lead',
      event_time: Math.floor(Date.now() / 1000),
      event_source_url: window.location.href,
      user_data: { email },
    });
  };

  return (
    <div className="w-screen h-screen bg-gray-100 flex items-center justify-center overflow-hidden">
      <QuizQuestion onComplete={handleQuizComplete} />
    </div>
  );
};

export default QuizPage;
