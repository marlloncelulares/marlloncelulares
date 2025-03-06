'use client';

import React, { useState, useEffect } from 'react';
import { sendConversionEvent } from '@/lib/integrations/meta-conversion';
import { useRouter } from 'next/navigation';

const QuizQuestion: React.FC = () => { // <- Renomeie aqui para QuizQuestion
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({ name: '', email: '', whatsapp: '' });
  const [answers, setAnswers] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    sendConversionEvent({
      event_name: 'PageView',
      event_time: Math.floor(Date.now() / 1000),
      event_source_url: window.location.href,
    });
  }, []);

  const handleOptionClick = (option: any) => {
    setAnswers([...answers, option.label]);
    setStep(step + 1);
  };

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ formData, answers }),
      });

      if (!response.ok) throw new Error('Erro ao enviar formulário.');

      await sendConversionEvent({
        event_name: 'Lead',
        event_time: Math.floor(Date.now() / 1000),
        event_source_url: window.location.href,
        user_data: {
          email: formData.email,
          phone: formData.whatsapp,
        },
      });

      router.push('/note-13-pro');
    } catch (error) {
      console.error('Erro:', error);
      alert('Erro ao enviar dados. Tente novamente.');
    }
  }

  return (
    <div className="w-screen h-screen bg-gray-100 flex items-center justify-center overflow-hidden">
      {step === 0 && (
        <div className="max-w-sm w-full mx-auto bg-white p-6 rounded-lg shadow-md text-center">
          <h2>🎉 Você foi selecionado(a) para participar do nosso Questionário!</h2>
          <button onClick={() => setStep(step + 1)}>Continuar</button>
        </div>
      )}

      {step === 1 && (
        <div className="max-w-sm bg-white p-6 rounded-lg shadow-md text-center">
          <h2>Qual é o modelo do seu celular atual?</h2>
          <button onClick={() => handleOptionClick({ label: 'iPhone' })}>iPhone 📱</button>
          <button onClick={() => handleOptionClick({ label: 'Samsung' })}>Samsung</button>
          <button onClick={() => handleOptionClick({ label: 'Motorola' })}>Motorola</button>
          <button onClick={() => handleOptionClick({ label: 'Outro' })}>Outro</button>
        </div>
      )}

      {step === 2 && (
        <div className="max-w-sm mx-auto">
          <form onSubmit={handleSubmitForm}>
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
              type="tel"
              placeholder="WhatsApp"
              value={formData.whatsapp}
              onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
              required
            />
            <button type="submit">Enviar</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default QuizQuestion; // <-- Corrija aqui também
