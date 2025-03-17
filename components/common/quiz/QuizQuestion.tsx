'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Option {
  id: number;
  label: string;
  emoji: string;
}

interface QuizStep {
  type: 'intro' | 'question' | 'form';
  content?: React.ReactNode;
  question?: string;
  options?: Option[];
}

const Quiz: React.FC = () => {
  const [step, setStep] = useState(0);
  const [showProgressBar, setShowProgressBar] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', whatsapp: '' });
  const [answers, setAnswers] = useState<{ question: string; option: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const savedFormData = localStorage.getItem('quizFormData');
    if (savedFormData) {
      setFormData(JSON.parse(savedFormData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('quizFormData', JSON.stringify(formData));
  }, [formData]);

  const steps: QuizStep[] = [
    {
      type: 'intro',
      content: (
        <div className="max-w-sm w-full mx-auto bg-white p-6 rounded-lg shadow-md text-center">
          <h2 className="text-lg font-bold text-gray-800 mb-6">
            🎉 Você foi selecionado(a) para participar do nosso Questionário de Satisfação!
          </h2>
          <p className="text-gray-700 mb-6">
            Como forma de agradecimento, você receberá um <strong>brinde exclusivo</strong> da loja após responder a algumas perguntas simples.
          </p>
          <button
            onClick={() => {
              setStep(step + 1);
              setShowProgressBar(true);
            }}
            className="mt-6 w-full bg-dark-blue text-white font-bold py-3 rounded-lg transition hover:bg-blue-950"
          >
            Continuar
          </button>
        </div>
      ),
    },
    {
      type: 'question',
      question: 'Qual é o modelo do seu celular atual?',
      options: [
        { id: 1, label: 'iPhone', emoji: '📱' },
        { id: 2, label: 'Samsung', emoji: '📱' },
        { id: 3, label: 'Motorola', emoji: '📱' },
        { id: 4, label: 'Outro', emoji: '📱' },
      ],
    },
    {
      type: 'question',
      question: 'Com que frequência você troca de celular?',
      options: [
        { id: 1, label: 'Todo ano', emoji: '🔄' },
        { id: 2, label: 'A cada 2 anos', emoji: '🕒' },
        { id: 3, label: 'Apenas quando quebra', emoji: '🔧' },
        { id: 4, label: 'Nunca troquei', emoji: '📴' },
      ],
    },
    {
      type: 'form',
      content: (
        <div className="max-w-sm w-full mx-auto bg-white p-6 rounded-lg shadow-md text-center">
          <h2 className="text-lg font-bold text-gray-800 mb-6">🎁 Parabéns! Você concluiu o questionário.</h2>
          <p className="text-gray-700 mb-6">
            Preencha seus dados abaixo para receber seu <strong>brinde exclusivo</strong>:
          </p>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Nome"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full mb-4 p-2 border border-gray-300 rounded"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="E-mail"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full mb-4 p-2 border border-gray-300 rounded"
              required
            />
            <input
              type="tel"
              name="whatsapp"
              placeholder="WhatsApp (ex.: 5538999999999)"
              value={formData.whatsapp}
              onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
              className="w-full mb-4 p-2 border border-gray-300 rounded"
              required
            />
            <button
              type="submit"
              className={`mt-6 w-full font-bold py-3 rounded-lg transition ${
                isLoading ? 'bg-gray-500' : 'bg-dark-blue text-white hover:bg-blue-950'
              }`}
              disabled={isLoading}
            >
              {isLoading ? 'Enviando...' : 'Enviar'}
            </button>
          </form>
        </div>
      ),
    },
  ];

  const handleOptionClick = (selectedOption: Option) => {
    const currentQuestion = steps[step].question;
    if (currentQuestion) {
      setAnswers((prevAnswers) => [...prevAnswers, { question: currentQuestion, option: selectedOption.label }]);
    }
    setStep(step + 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const whatsappRegex = /^\d{10,14}$/;
    if (!emailRegex.test(formData.email)) {
      setError('E-mail inválido.');
      setIsLoading(false);
      return;
    }
    if (!whatsappRegex.test(formData.whatsapp)) {
      setError('WhatsApp inválido. Use apenas números (ex.: 5538999999999).');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          whatsapp: formData.whatsapp,
          answers,
        }),
      });

      if (response.ok) {
        localStorage.removeItem('quizFormData');
        router.push('/note-13-pro');
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Erro ao enviar os dados.');
      }
    } catch (error) {
      console.error('Erro ao enviar os dados:', error);
      setError('Erro ao enviar os dados. Tente novamente mais tarde.');
    } finally {
      setIsLoading(false);
    }
  };

  const progressPercentage = ((step + 1) / steps.length) * 100;

  return (
    <div className="w-screen h-screen bg-gray-100 flex flex-col justify-start relative">
      {showProgressBar && (
        <div className="w-full fixed top-0 left-0 h-2 bg-gray-200">
          <div className="h-4 bg-yellow transition-all" style={{ width: `${progressPercentage}%` }}></div>
        </div>
      )}
      <div className="flex flex-1 items-center justify-center">
        {steps[step].type === 'intro' || steps[step].type === 'form' ? (
          <div className="p-4 w-full">{steps[step].content}</div>
        ) : steps[step].type === 'question' && steps[step].options ? (
          <div className="max-w-sm w-full mx-auto bg-white p-6 rounded-lg shadow-md text-center">
            <h2 className="text-lg font-bold text-gray-800 mb-6">{steps[step].question}</h2>
            <div className="space-y-4">
              {steps[step].options.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleOptionClick(option)}
                  className="flex items-center justify-between w-full px-4 py-3 border rounded-lg transition bg-white border-gray-300 hover:bg-gray-100"
                >
                  <span className="text-lg">{option.emoji}</span>
                  <span className="text-sm font-medium text-gray-800">{option.label}</span>
                </button>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Quiz;