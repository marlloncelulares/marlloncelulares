import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useRouter } from 'next/navigation';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const Scheduler = () => {
  const [step, setStep] = useState(1);
  const [date, setDate] = useState<Value>(null);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const times = [
    '07:00', '08:00', '09:00', '10:00', '11:00', '12:00',
    '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'
  ];

  const sendMetaEvent = async () => {
    try {
      await fetch('/api/meta-events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event_name: 'Schedule',
          event_time: Math.floor(Date.now() / 1000),
          user_data: { lead_name: name, lead_email: email, lead_whatsapp: whatsapp },
          custom_data: { 
            content_name: 'Limpeza Gratuita',
            appointment_date: date instanceof Date ? date.toISOString().split('T')[0] : '',
            appointment_time: selectedTime
          }
        })
      });
    } catch (error) {
      console.error('Erro no evento do Facebook:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || !selectedTime || !name || !email || !whatsapp) {
      alert('Preencha todos os campos!');
      return;
    }

    setIsLoading(true);

    try {
      // Enviar confirmação
      const response = await fetch('/api/send-schedule-confirmation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          date: date instanceof Date ? date.toISOString().split('T')[0] : '',
          time: selectedTime,
          whatsapp
        })
      });

      if (!response.ok) throw new Error('Erro no agendamento');

      // Enviar evento para Meta
      await sendMetaEvent();

      router.push('/agendamento-sucesso');

    } catch (error) {
      console.error(error);
      alert('Erro ao agendar. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
      {step === 1 && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Escolha Data e Hora</h2>
          <Calendar 
            onChange={(value) => setDate(value)} 
            value={date} 
            minDate={new Date()}
            locale="pt-BR"
          />
          
          <div className="grid grid-cols-3 gap-2 mt-4">
            {times.map((time) => (
              <button
                key={time}
                onClick={() => setSelectedTime(time)}
                className={`p-2 rounded ${selectedTime === time ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              >
                {time}
              </button>
            ))}
          </div>

          <button
            onClick={() => setStep(2)}
            className="mt-4 w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
          >
            Próximo
          </button>
        </div>
      )}

      {step === 2 && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Nome Completo"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="tel"
            placeholder="WhatsApp (com DDI)"
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
            className="w-full p-2 border rounded"
            pattern="^\+[0-9]{11,15}"
            required
          />
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
          >
            {isLoading ? 'Enviando...' : 'Confirmar Agendamento'}
          </button>
        </form>
      )}
    </div>
  );
};

export default Scheduler;
