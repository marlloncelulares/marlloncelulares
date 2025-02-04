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

    // Formatar respostas
    const formattedAnswers = answers
      .map(
        (answer: { question: string; option: string }) =>
          `<li><strong>${answer.question}:</strong> ${answer.option}</li>`
      )
      .join('');

    // E-mail para o lead
    const mailOptionsLead = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Obrigado por participar do nosso questionário! 🎉',
      html: `
        <h1>Olá, ${name}!</h1>
        <p>Obrigado por participar do nosso questionário de satisfação.</p>
        <h3>🎁 Seu brinde exclusivo está garantido!</h3>
        <p>Por favor, visite uma das nossas lojas para retirar seu brinde. Não se esqueça de mencionar que participou do questionário.</p>
        <p>Atenciosamente,<br>Equipe Claudinho Celulares</p>
      `,
    };

    // E-mail para o administrador
    const mailOptionsAdmin = {
      from: process.env.EMAIL_USER,
      to: 'agendamentos@claudinhocelulares.com.br',
      subject: 'Novo lead do questionário de satisfação! 🎉',
      html: `
        <h1>Detalhes do Lead:</h1>
        <ul>
          <li><strong>Nome:</strong> ${name}</li>
          <li><strong>E-mail:</strong> ${email}</li>
          <li><strong>WhatsApp:</strong> ${whatsapp}</li>
        </ul>
        <h2>Respostas do Questionário:</h2>
        <ul>${formattedAnswers}</ul>
        <p>Por favor, entre em contato para fortalecer o relacionamento com o cliente.</p>
      `,
    };

    // Enviar os e-mails
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
