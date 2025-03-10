'use client';

import React, { useEffect } from 'react';
import Quiz from '@/components/common/quiz/QuizQuestion';

const QuizPage: React.FC = () => {

  useEffect(() => {
    fetch('/api/meta-events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event_name: 'ViewContent',
        event_time: Math.floor(Date.now() / 1000),
        custom_data: { content_name: 'Quiz', content_category: 'Quiz' },
      }),
    });
  }, []);

  return (
    <div className="w-screen h-screen bg-gray-100 flex items-center justify-center overflow-hidden">
      <Quiz />
    </div>
  );
};

export default QuizPage;
