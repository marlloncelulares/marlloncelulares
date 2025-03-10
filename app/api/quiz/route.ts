import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { name, email, whatsapp } = await request.json();

    if (!name || !email || !whatsapp) {
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

    const mailOptionsLead = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Obrigado por participar do nosso questionário! 🎉',
      html: `
        <h1>Olá, ${name}!</h1>
        <p>Obrigado por participar do nosso questionário de satisfação.</p>
        <p>🎁 Seu brinde exclusivo está garantido!</p>
        <p>Visite nossa loja para retirar seu brinde.</p>
        <p>Equipe Marllon Celulares</p>
      `,
    };

    const mailOptionsAdmin = {
      from: process.env.EMAIL_USER,
      to: 'comercial@marlloncelulares.com',
      subject: 'Novo Lead do Quiz',
      html: `
        <h1>Novo Lead Quiz:</h1>
        <ul>
          <li><strong>Nome:</strong> ${name}</li>
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>WhatsApp:</strong> ${whatsapp}</li>
        </ul>
      `,
    };

    await transporter.sendMail(mailOptionsLead);
    await transporter.sendMail(mailOptionsAdmin);

    return NextResponse.json({ message: 'E-mails enviados com sucesso!' }, { status: 200 });
  } catch (error) {
    console.error('Erro no envio dos emails:', error);
    return NextResponse.json({ message: 'Erro ao enviar e-mails.' }, { status: 500 });
  }
}
