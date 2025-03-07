import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import { useRouter } from 'next/navigation';

const sendEvent = async (event_name: string, user_data?: object) => {
  await fetch('/api/meta-events', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ event_name, user_data }),
  });
};

const Scheduler: React.FC = () => {
  const [date, setDate] = useState<Date | null>(null);
  const [email, setEmail] = useState('');
  const router = useRouter();

  useEffect(() => {
    sendEvent('PageView');
  }, []);

  const handleSchedule = () => {
    if (date) {
      sendEvent('Schedule', { email, date: date.toISOString().split('T')[0] });
    }
  };

  const handleConfirm = () => {
    sendEvent('CompleteRegistration', { email });
    router.push('/');
  };

  return (
    <div>
      <Calendar onChange={setDate} value={date} />
      <input
        type="email"
        placeholder="Digite seu email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleSchedule}>Escolher Data</button>
      <button onClick={handleConfirm}>Confirmar Agendamento</button>
    </div>
  );
};

export default Scheduler;
