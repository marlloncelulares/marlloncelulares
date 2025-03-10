'use client';

import React, { useState } from 'react';
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
  const [formData, setFormData] = useState({ name: '', email: '', whatsapp: '' });
  const router = useRouter();

  const steps: QuizStep[] = [
    {
      type: 'intro',
      content: (
        <div className="max-w-sm w-full mx-auto bg-white p-6 rounded-lg shadow-md text-center">
          <h2 className="text-lg font-bold text-gray-800 mb-6">
            🎉 Você foi selecionado(a) para participar do nosso Questionário de Satisfação!
          </h2>
          <p className="text-gray-700 mb-6">
            Como forma de agradecimento, você receberá um <strong>brinde exclusivo</strong> da loja após responder algumas perguntas simples.
          </p>
          <button
            onClick={() => setStep(step + 1)}
            className="mt-6 w-full bg-dark-blue text-white font-bold py-3 rounded-lg transition hover:bg-blue-950"
          >
            Continuar
          </button>
        </div>
      ),
    },
    {
      type: 'form',
      content: (
        <div className="max-w-sm w-full mx-auto bg-white p-6 rounded-lg shadow-md text-center">
          <h2 className="text-lg font-bold text-gray-800 mb-6">🎁 Parabéns! Você concluiu o questionário.</h2>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              try {
                const response = await fetch('/api/quiz', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(formData),
                });

                if (response.ok) {
                  await fetch('/api/meta-events', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      event_name: 'CompleteRegistration',
                      event_time: Math.floor(Date.now() / 1000),
                      user_data: {
                        lead_name: formData.name,
                        lead_email: formData.email,
                        lead_whatsapp: formData.whatsapp,
                      },
                      custom_data: { content_name: 'Quiz' },
                    }),
                  });

                  alert('Obrigado por participar! Verifique seu e-mail.');
                  router.push('/note-13-pro');
                } else {
                  alert('Erro ao enviar os dados. Tente novamente mais tarde.');
                }
              } catch (error) {
                console.error('Erro ao enviar os dados:', error);
                alert('Erro ao enviar os dados. Tente novamente mais tarde.');
              }
            }}
          >
            <input placeholder="Nome" required />
            <input placeholder="E-mail" type="email" required />
            <input placeholder="WhatsApp" type="tel" required />
            <button
              type="submit"
              className="mt-6 w-full bg-dark-blue text-white font-bold py-3 rounded-lg transition hover:bg-blue-950"
            >
              Enviar
            </button>
          </form>
        </div>
      ),
    },
  ];

  return (
    <div className="w-screen h-screen bg-gray-100 flex items-center justify-center overflow-hidden">
      {steps[step].content}
    </div>
  );
};

export default Quiz;
