'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const sendEvent = async (event_name: string, email?: string) => {
  await fetch('/api/meta-events', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ event_name, user_data: { email } }),
  });
};

const Quiz: React.FC = () => {
  const [step, setStep] = useState(0);
  const [email, setEmail] = useState('');
  const router = useRouter();

  useEffect(() => {
    sendEvent('PageView');
  }, []);

  const handleComplete = () => {
    sendEvent('Lead', email);
    router.push('/note-13-pro');
  };

  return (
    <div>
      {step === 0 ? (
        <div>
          <h2>Bem-vindo ao Quiz!</h2>
          <button onClick={() => setStep(1)}>Começar</button>
        </div>
      ) : (
        <div>
          <input
            type="email"
            placeholder="Digite seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button onClick={handleComplete}>Finalizar</button>
        </div>
      )}
    </div>
  );
};

export default Quiz;
