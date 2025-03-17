'use client';

import React from 'react';
import Quiz from '@/components/common/quiz/QuizQuestion';

const QuizPage: React.FC = () => {
  return (
    <div className="w-screen h-screen bg-gray-100 flex items-center justify-center overflow-hidden">
      <Quiz />
    </div>
  );
};

export default QuizPage;
