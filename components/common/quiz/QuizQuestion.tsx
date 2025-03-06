import React, { useState, useEffect } from 'react';
import { sendConversionEvent } from '@/lib/integrations/meta-conversion';
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
  const [formData, setFormData] = React.useState({ name: '', email: '', whatsapp: '' });
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const router = useRouter();

  const steps: QuizStep[] = [
    // (seus passos originais aqui, mantidos exatamente iguais)
  ];

  useEffect(() => {
    sendConversionEvent({
      event_name: 'PageView',
      event_time: Math.floor(Date.now() / 1000),
      event_source_url: window.location.href,
    });
  }, []);

  const handleOptionClick = (option: Option) => {
    setAnswers((prev) => ({ ...prev, [steps[step].question || '']: option.label }));
    setStep((prev) => prev + 1);
  };

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          answers,
        }),
      });

      if (!response.ok) throw new Error('Erro ao enviar o formulário do quiz.');

      await sendConversionEvent({
        event_name: 'Lead',
        event_time: Math.floor(Date.now() / 1000),
        event_source_url: window.location.href,
        user_data: {
          email: formData.email,
          phone: formData.whatsapp,
        },
      });

      router.push('/');
    } catch (error) {
      console.error(error);
      alert('Erro ao enviar dados. Tente novamente mais tarde.');
    }
  };

  return (
    <div className="w-screen h-screen bg-gray-100 flex flex-col justify-start relative">
      <div className="flex flex-1 items-center justify-center">
        {steps[step].type === 'intro' || steps[step].type === 'form' ? (
          <div className="p-4 w-full">
            {steps[step].type === 'form' ? (
              <form onSubmit={(e) => { e.preventDefault(); handleSubmitForm(); }}>
                <input
                  type="text"
                  placeholder="Nome"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
                <input
                  type="email"
                  placeholder="E-mail"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
                <input
                  type="text"
                  placeholder="WhatsApp"
                  value={formData.whatsapp}
                  onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                  required
                />
                <button type="submit">
                  Enviar
                </button>
              </form>
            ) : (
              steps[step].type === 'intro' ? (
                <>{steps[step].content}</>
              ) : (
                steps[step].options?.map((option) => (
                  <button key={option.id} onClick={() => handleOptionClick(option)}>
                    {option.label}
                  </button>
                ))
              )
            )}
        </div>
    </div>
  );
};

export default Quiz;
