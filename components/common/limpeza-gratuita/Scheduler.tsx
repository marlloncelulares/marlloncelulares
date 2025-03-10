import React, { useState } from 'react';
import Calendar, { CalendarProps } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useRouter } from 'next/navigation';

const Scheduler: React.FC = () => {
  const [step, setStep] = useState(1);
  const [date, setDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [whatsapp, setWhatsapp] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleDateChange: CalendarProps['onChange'] = (value) => {
    if (Array.isArray(value)) {
      setDate(value[0]);
    } else {
      setDate(value);
    }
  };

  const sendMetaEvent = async () => {
    const payload = {
      event_name: 'Schedule',
      event_time: Math.floor(Date.now() / 1000),
      user_data: {
        lead_name: name,
        lead_email: email,
        lead_whatsapp: whatsapp,
      },
      custom_data: {
        content_name: 'Limpeza Gratuita',
        content_category: 'Serviços',
        appointment_date: date?.toISOString().split('T')[0],
        appointment_time: selectedTime,
      },
    };

    try {
      await fetch('/api/meta-events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      console.log('Evento Schedule enviado com sucesso!');
    } catch (error) {
      console.error('Erro ao enviar evento Schedule:', error);
    }
  };

  const sendScheduleConfirmation = async () => {
    const payload = {
      name,
      email,
      date: date?.toISOString().split('T')[0],
      time: selectedTime,
      whatsapp,
    };

    const response = await fetch('/api/send-schedule-confirmation', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error('Erro ao enviar confirmação.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (date && selectedTime && name && email && whatsapp) {
      setIsLoading(true);

      await sendScheduleConfirmation();
      await sendMetaEvent();  // Chamada correta aqui!

      setIsLoading(false);
      router.push('/');
    } else {
      alert('Por favor, preencha todos os campos.');
    }
  };

  const times = [
    '07:00', '08:00', '09:00', '10:00', '11:00', '12:00',
    '13:00', '14:00', '15:00', '16:00', '17:00', '18:00',
  ];

  return (
    <div className="bg-black flex flex-col items-center space-y-6 my-8 w-full px-4">
      {step === 1 && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (date && selectedTime) {
              setStep(2);
            } else {
              alert('Por favor, selecione uma data e horário.');
            }
          }}
          className="flex flex-col items-center space-y-6"
        >
          <h2 className="text-white font-bold text-2xl md:text-3xl text-center mb-8">
            Selecione Data e Hora Aqui
          </h2>
          <Calendar onChange={handleDateChange} value={date} locale="pt-BR" className="react-calendar" />
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {times.map((time) => (
              <button key={time} onClick={() => setSelectedTime(time)}>
                {time}
              </button>
            ))}
          </div>
          <button type="submit">Próximo</button>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handleSubmit}>
          <input placeholder="Nome" value={name} onChange={(e) => setName(e.target.value)} required />
          <input placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input placeholder="WhatsApp" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} required />
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Enviando...' : 'Confirmar Agendamento'}
          </button>
        </form>
      )}
    </div>
  );
};

export default Scheduler;
