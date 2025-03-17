import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { name, email, whatsapp, answers } = await request.json();

    if (!name || !email || !whatsapp || !answers) {
      return NextResponse.json({ message: 'Todos os campos são obrigatórios.' }, { status: 400 });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const whatsappRegex = /^\d{10,14}$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ message: 'E-mail inválido.' }, { status: 400 });
    }
    if (!whatsappRegex.test(whatsapp)) {
      return NextResponse.json({ message: 'WhatsApp inválido. Use apenas números (ex.: 5538999999999).' }, { status: 400 });
    }

    const lead = await prisma.quizLead.create({
      data: {
        name,
        email,
        whatsapp,
        answers: {
          create: answers.map((answer: { question: string; option: string }) => ({
            question: answer.question,
            answer: answer.option,
          })),
        },
      },
    });

    const transporter = nodemailer.createTransport({
      host: 'smtp.titan.email',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      authMethod: 'LOGIN',
      debug: true,
      logger: true,
    });

    await transporter.verify();

    const formattedAnswers = answers
      .map(
        (answer: { question: string; option: string }) =>
          `<li><strong>${answer.question}:</strong> ${answer.option}</li>`
      )
      .join('');

    const mailOptionsLead = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Obrigado por participar do nosso questionário! 🎉',
      html: `
        <h1>Olá, ${name}!</h1>
        <p>Obrigado por participar do nosso questionário de satisfação.</p>
        <h3>🎁 Seu brinde exclusivo está garantido!</h3>
        <p>Por favor, visite uma das nossas lojas para retirar seu brinde. Não se esqueça de mencionar que participou do questionário.</p>
        <p>Atenciosamente,<br>Equipe Marllon Celulares</p>
      `,
    };

    const mailOptionsAdmin = {
      from: process.env.EMAIL_USER,
      to: 'agendamentos@marlloncelulares.com.br',
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

    await Promise.all([
      transporter.sendMail(mailOptionsLead),
      transporter.sendMail(mailOptionsAdmin),
    ]);

    await fetch('/api/meta-events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event_name: 'CompleteRegistration',
        event_time: Math.floor(Date.now() / 1000),
        user_data: { em: email, ph: whatsapp },
        custom_data: { lead_name: name },
      }),
    });

    return NextResponse.json({ message: 'E-mails enviados e lead registrado com sucesso!' }, { status: 200 });
  } catch (error) {
    console.error('Erro ao processar o quiz:', error);
    return NextResponse.json({ message: 'Erro ao processar o quiz.' }, { status: 500 });
  }
}