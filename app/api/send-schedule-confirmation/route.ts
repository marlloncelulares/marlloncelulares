import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { name, email, date, time, whatsapp } = await request.json();

    if (!name || !email || !date || !time) {
      return NextResponse.json({ message: 'Todos os campos são obrigatórios.' }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      host: 'smtp.titan.email',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // E-mail para o lead
    const mailOptionsLead = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Sua limpeza gratuita está confirmada! 🎉 Aqui está o que você precisa saber',
      html: `
        <h1>Olá, ${name}!</h1>
        <p>Sua limpeza gratuita (externa) está confirmada.</p>
        <h3>🗓️ Detalhes do seu agendamento:</h3>
        <ul>
          <li><strong>Data:</strong> ${date}</li>
          <li><strong>Horário:</strong> ${time}</li>
          <p>Rua do Progresso, 48a - Primeiro de Maio, Itamarandiba - MG</p>
        </ul>
        <h3>O que esperar do serviço?</h3>
        <ul>
          <li>✅ Remoção de resíduos acumulados.</li>
          <li>✅ Avaliação do estado geral do equipamento.</li>
          <li>✅ Dicas personalizadas para maximizar o desempenho.</li>
        </ul>
        <p>💡 Adicione ao calendário para não perder a data!</p>
        <p>Se tiver dúvidas, <a href="https://wa.me/5538984184684">clique aqui</a> e fale conosco.</p>
        <p>Atenciosamente,<br>Time de marketing — Marllon Celulares</p>
      `,
    };

    // E-mail para você (agendamentos@claudinhocelulares.com.br)
    const mailOptionsAdmin = {
      from: process.env.EMAIL_USER,
      to: 'comercial@marlloncelulares.com',
      subject: 'Novo agendamento recebido! 🎉',
      html: `
        <h1>Olá, Marllon Celulares!</h1>
        <p>Um novo agendamento foi recebido. Confira os detalhes:</p>
        <h3>🗓️ Detalhes do agendamento:</h3>
        <ul>
          <li><strong>Nome:</strong> ${name}</li>
          <li><strong>E-mail:</strong> ${email}</li>
          <li><strong>WhatsApp:</strong> ${whatsapp}</li>
          <li><strong>Data:</strong> ${date}</li>
          <li><strong>Horário:</strong> ${time}</li>
        </ul>
        <p>Mantenha o cliente informado sobre o próximo passo!</p>
        <p>Atenciosamente,<br>Equipe de suporte</p>
      `,
    };

    // Envio dos e-mails
    await Promise.all([
      transporter.sendMail(mailOptionsLead),
      transporter.sendMail(mailOptionsAdmin),
    ]);

    return NextResponse.json({ message: 'E-mails enviados com sucesso!' }, { status: 200 });
  } catch (error) {
    console.error('Erro ao enviar os e-mails:', error);
    return NextResponse.json({ message: 'Erro ao enviar os e-mails.' }, { status: 500 });
  }
}
