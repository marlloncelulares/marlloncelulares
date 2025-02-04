import React, { useState } from 'react';
import Calendar, { CalendarProps } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useRouter } from 'next/navigation';

// Tipo específico para os parâmetros da função fbq
interface FbqParams {
  content_name: string;
  content_category: string;
  lead_name: string;
  lead_email: string;
  lead_whatsapp: string;
  appointment_date: string | undefined;
  appointment_time: string | null;
}

// Definição da interface para o objeto 'fbq'
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
    if (Array.isArray(value)) {
      setDate(value[0]);
    } else {
      setDate(value);
    }
  };

  const sendMetaEvent = () => {
    try {
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
        console.log('Evento "Schedule" enviado para Meta Ads:', {
          content_name: 'Limpeza Gratuita',
          content_category: 'Serviço de Limpeza',
          lead_name: name,
          lead_email: email,
          lead_whatsapp: whatsapp,
          appointment_date: date?.toISOString().split('T')[0],
          appointment_time: selectedTime,
        });
      }
    } catch (error) {
      console.error('Erro ao enviar evento para Meta Ads:', error);
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

      if (!response.ok) {
        throw new Error('Erro ao enviar confirmação.');
      }

      sendMetaEvent(); // Enviar evento "Schedule" para Meta Ads após sucesso
    } catch (error) {
      console.error('Erro ao enviar confirmação de agendamento:', error);
      alert('Erro ao confirmar o agendamento. Tente novamente mais tarde.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (date && selectedTime && name && email && whatsapp) {
      setIsLoading(true);

      await sendScheduleConfirmation();

      setIsLoading(false);
      router.push('/'); // Redireciona após o agendamento
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

          <div className="bg-[#333] p-10 rounded-lg shadow-lg grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
            <div className="w-full flex justify-center">
              <Calendar
                onChange={handleDateChange}
                value={date}
                locale="pt-BR"
                className="react-calendar"
                tileDisabled={({ date }) => date.getDay() === 0 || date.getDay() === 6}
              />
            </div>

            <div className="flex flex-col items-center">
              <h3 className="text-white font-semibold text-lg mb-4">Escolha o horário</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 w-full">
                {times.map((time) => (
                  <button
                    type="button"
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`px-4 py-2 rounded transition-all ${
                      selectedTime === time
                        ? 'bg-yellow text-black font-bold'
                        : 'bg-white text-black hover:bg-gray-200'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="bg-yellow text-black font-semibold px-8 py-3 rounded transition-all hover:bg-yellow-600 w-full sm:w-auto"
          >
            Próximo
          </button>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handleSubmit} className="bg-[#333] p-10 rounded-lg shadow-lg flex flex-col items-center space-y-6">
          <h2 className="text-white font-bold text-2xl md:text-3xl text-center mb-8">
            Preencha seus Dados
          </h2>
          <input
            type="text"
            placeholder="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full max-w-lg px-4 py-2 rounded border"
            required
          />
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full max-w-lg px-4 py-2 rounded border"
            required
          />
          <input
            type="text"
            placeholder="WhatsApp"
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
            className="w-full max-w-lg px-4 py-2 rounded border"
            required
          />

          <button
            type="submit"
            className={`${
              isLoading ? 'bg-gray-500' : 'bg-yellow-500'
            } text-black font-semibold px-8 py-3 rounded transition-all hover:bg-yellow-600 w-full`}
            disabled={isLoading}
          >
            {isLoading ? 'Enviando...' : 'Confirmar Agendamento'}
          </button>
        </form>
      )}
    </div>
  );
};

export default Scheduler;
