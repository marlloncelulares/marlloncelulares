'use client';

import React, { useState } from 'react';
import Calendar, { CalendarProps } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useRouter } from 'next/navigation';
import { sha256 } from '@/utils/hash';

interface SchedulerProps {
  service: 'conserto' | 'limpeza-gratuita';
}

const Scheduler: React.FC<SchedulerProps> = ({ service }) => {
  const [step, setStep] = useState(1);
  const [date, setDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [problema, setProblema] = useState(''); // Campo para o problema (apenas para conserto)
  const [modelo, setModelo] = useState(''); // Novo campo para modelo do celular (apenas para conserto)
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleDateChange: CalendarProps['onChange'] = (value) => {
    if (Array.isArray(value)) {
      setDate(value[0]);
    } else {
      setDate(value);
    }
  };

  const sendMetaEvent = async (eventName: string) => {
    try {
      const hashedEmail = await sha256(email);
      const hashedPhone = await sha256(whatsapp);

      await fetch('/api/meta-events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event_name: eventName,
          event_time: Math.floor(Date.now() / 1000),
          user_data: {
            em: hashedEmail,
            ph: hashedPhone,
            client_user_agent: navigator.userAgent,
          },
          custom_data: {
            content_name: service === 'conserto' ? 'Conserto de Celular' : 'Limpeza Gratuita',
            content_category: service === 'conserto' ? 'Serviço de Conserto' : 'Serviço de Limpeza',
            lead_name: name,
            lead_email: email,
            lead_whatsapp: whatsapp,
            appointment_date: date?.toISOString().split('T')[0],
            appointment_time: selectedTime,
            problema: service === 'conserto' ? problema : undefined,
            modelo: service === 'conserto' ? modelo : undefined,
          },
        }),
      });

      console.log(`[Meta] Evento ${eventName} enviado com sucesso!`);
    } catch (error) {
      console.error(`Erro ao enviar evento ${eventName}:`, error);
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
        problema: service === 'conserto' ? problema : undefined,
        modelo: service === 'conserto' ? modelo : undefined,
      };

      const apiEndpoint = service === 'conserto' ? '/api/send-conserto-confirmation' : '/api/send-schedule-confirmation';

      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error('Erro ao enviar confirmação.');

      await sendMetaEvent('Schedule');
    } catch (error) {
      console.error('Erro ao enviar confirmação de agendamento:', error);
      alert('Erro ao confirmar o agendamento. Tente novamente mais tarde.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (date && selectedTime && name && email && whatsapp && (service !== 'conserto' || (problema && modelo))) {
      setIsLoading(true);
      await sendScheduleConfirmation();
      setIsLoading(false);
      router.push(service === 'conserto' ? '/conserto/confirmado' : '/limpeza-gratuita/sucesso');
    } else {
      alert('Por favor, preencha todos os campos.');
    }
  };

  const times = [
    '07:00', '08:00', '09:00', '10:00', '11:00', '12:00',
    '13:00', '14:00', '15:00', '16:00', '17:00', '18:00',
  ];

  const problemasOpcoes = [
    'Tela quebrada',
    'Bateria fraca',
    'Celular lento',
    'Botões não funcionam',
    'Problemas de som',
    'Outros',
  ];

  return (
    <div className="bg-black flex flex-col items-center space-y-6 my-8 w-full px-4">
      {step === 1 && (
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            if (date && selectedTime) {
              await sendMetaEvent('InitiateCheckout');
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
                className="react-calendar bg-black text-white border-gray-600"
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
                        ? 'bg-yellow-500 text-black font-bold'
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
            className="bg-yellow-500 text-black font-semibold px-8 py-3 rounded transition-all hover:bg-yellow-600 w-full sm:w-auto"
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
            className="w-full max-w-lg px-4 py-2 rounded border border-gray-600 bg-black text-white placeholder-gray-400 focus:border-yellow-400 focus:outline-none"
            required
          />
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full max-w-lg px-4 py-2 rounded border border-gray-600 bg-black text-white placeholder-gray-400 focus:border-yellow-400 focus:outline-none"
            required
          />
          <input
            type="text"
            placeholder="WhatsApp"
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
            className="w-full max-w-lg px-4 py-2 rounded border border-gray-600 bg-black text-white placeholder-gray-400 focus:border-yellow-400 focus:outline-none"
            required
          />
          {service === 'conserto' && (
            <>
              <select
                value={problema}
                onChange={(e) => setProblema(e.target.value)}
                className="w-full max-w-lg px-4 py-2 rounded border border-gray-600 bg-black text-white focus:border-yellow-400 focus:outline-none"
                required
              >
                <option value="" disabled>Selecione o problema</option>
                {problemasOpcoes.map((opcao) => (
                  <option key={opcao} value={opcao}>
                    {opcao}
                  </option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Modelo do celular (ex.: iPhone 14)"
                value={modelo}
                onChange={(e) => setModelo(e.target.value)}
                className="w-full max-w-lg px-4 py-2 rounded border border-gray-600 bg-black text-white placeholder-gray-400 focus:border-yellow-400 focus:outline-none"
                required
              />
            </>
          )}

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
