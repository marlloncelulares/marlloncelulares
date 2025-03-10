import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { name, email, whatsapp, answers } = await request.json();

    if (!name || !email || !whatsapp || !answers) {
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

    const formattedAnswers = answers
      .map(
        (answer: { question: string; option: string }) =>
          `<li><strong>${answer.question}:</strong> ${answer.option}</li>`
      ).join('');

    const mailOptionsLead = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Obrigado por participar do nosso questionário! 🎉',
      html: `
        <h1>Olá, ${name}!</h1>
        <p>Obrigado por participar do nosso questionário de satisfação.</p>
        <h3>🎁 Seu brinde exclusivo está garantido!</h3>
        <p>Visite nossa loja para retirá-lo.</p>
        <p>Equipe Claudinho Celulares</p>
      `,
    };

    const mailOptionsAdmin = {
      from: process.env.EMAIL_USER,
      to: 'agendamentos@claudinhocelulares.com.br',
      subject: 'Novo lead do questionário de satisfação!',
      html: `
        <h1>Detalhes do Lead:</h1>
        <ul>
          <li><strong>Nome:</strong> ${name}</li>
          <li><strong>E-mail:</strong> ${email}</li>
          <li><strong>WhatsApp:</strong> ${whatsapp}</li>
        </ul>
        <h2>Respostas:</h2>
        <ul>${formattedAnswers}</ul>
      `,
    };

    await transporter.sendMail(mailOptionsLead);
    await transporter.sendMail(mailOptionsAdmin);

    return NextResponse.json({ message: 'E-mails enviados!' }, { status: 200 });
  } catch (error) {
    console.error('Erro no envio dos e-mails:', error);
    return NextResponse.json({ message: 'Erro ao enviar e-mails.' }, { status: 500 });
  }
}
