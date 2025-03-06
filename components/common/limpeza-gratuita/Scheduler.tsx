import React, { useState } from 'react';
import Calendar, { CalendarProps } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useRouter } from 'next/navigation';
import { sendConversionEvent } from '@/lib/integrations/meta-conversion';

interface FbqParams {
  content_name: string;
  content_category: string;
  lead_name: string;
  lead_email: string;
  lead_whatsapp: string;
  appointment_date: string | undefined;
  appointment_time: string | null;
}

interface Fbq {
  (event: string, action: string, params: FbqParams): void;
}

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
    setDate(Array.isArray(value) ? value[0] : value);
  };

  const sendMetaEvent = () => {
    if (typeof window !== 'undefined' && 'fbq' in window) {
      const fbq = (window as typeof window & { fbq: Fbq }).fbq;
      fbq('track', 'Schedule', {
        content_name: 'Limpeza Gratuita',
        content_category: 'Serviço de Limpeza',
        lead_name: name,
        lead_email: email,
        lead_whatsapp: whatsapp,
        appointment_date: date?.toISOString().split('T')[0],
        appointment_time: selectedTime,
      });
    }
  };

  const sendScheduleConfirmation = async () => {
    try {
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

      if (!response.ok) throw new Error('Erro ao enviar confirmação.');

      sendMetaEvent(); // Pixel tradicional

      await sendConversionEvent({ // Meta Conversion API (server-side)
        event_name: 'Schedule',
        event_time: Math.floor(Date.now() / 1000),
        event_source_url: window.location.href,
        user_data: { email, phone: whatsapp },
      });

    } catch (error) {
      console.error('Erro:', error);
      alert('Erro ao confirmar o agendamento. Tente novamente mais tarde.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (date && selectedTime && name && email && whatsapp) {
      setIsLoading(true);
      await sendScheduleConfirmation();
      setIsLoading(false);
      router.push('/');
    } else {
      alert('Por favor, preencha todos os campos.');
    }
  };

  const times = ['07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'];

  return (
    <div className="bg-black flex flex-col items-center space-y-6 my-8 w-full px-4">
      {step === 1 && (
        <form onSubmit={(e) => { e.preventDefault(); date && selectedTime ? setStep(2) : alert('Selecione data e horário.'); }} className="flex flex-col items-center space-y-6">
          <h2 className="text-white font-bold text-2xl md:text-3xl text-center mb-8">Selecione Data e Hora Aqui</h2>
          <Calendar onChange={handleDateChange} value={date} locale="pt-BR" className="react-calendar" tileDisabled={({ date }) => [0, 6].includes(date.getDay())} />
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 w-full">
            {times.map((time) => (
              <button type="button" key={time} onClick={() => setSelectedTime(time)} className={`px-4 py-2 rounded ${selectedTime === time ? 'bg-yellow text-black' : 'bg-white'}`}>
                {time}
              </button>
            ))}
          </div>
          <button type="submit" className="bg-yellow text-black px-8 py-3 rounded">Próximo</button>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handleSubmit} className="bg-[#333] p-10 rounded flex flex-col items-center space-y-6">
          <input type="text" placeholder="Nome" value={name} onChange={(e) => setName(e.target.value)} required />
          <input type="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="text" placeholder="WhatsApp" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} required />
          <button type="submit" disabled={isLoading} className="bg-yellow-500 px-8 py-3 rounded">
            {isLoading ? 'Enviando...' : 'Confirmar Agendamento'}
          </button>
        </form>
      )}
    </div>
  );
};

export default Scheduler;
