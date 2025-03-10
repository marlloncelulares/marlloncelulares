import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { name, email, whatsapp } = await request.json();

    if (!name || !email || !whatsapp) {
      return NextResponse.json({ message: 'Campos obrigatórios ausentes.' }, { status: 400 });
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
      subject: 'Obrigado por participar! 🎉',
      html: `
        <h1>Olá, ${name}!</h1>
        <p>Obrigado por participar do nosso questionário!</p>
        <p>🎁 Seu brinde exclusivo já está garantido, venha até nossa loja retirá-lo!</p>
        <p>Equipe Marllon Celulares</p>
      `,
    };

    const mailOptionsAdmin = {
      from: process.env.EMAIL_USER,
      to: 'comercial@marlloncelulares.com',
      subject: 'Novo Lead do Quiz',
      html: `
        <h2>Novo lead capturado no Quiz!</h2>
        <ul>
          <li><strong>Nome:</strong> ${name}</li>
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>WhatsApp:</strong> ${whatsapp}</li>
        </ul>
      `,
    };

    await transporter.sendMail(mailOptionsLead);
    await transporter.sendMail(mailOptionsAdmin);

    return NextResponse.json({ message: 'Emails enviados com sucesso!' }, { status: 200 });
  } catch (error) {
    console.error('Erro envio quiz:', error);
    return NextResponse.json({ message: 'Erro interno do servidor.' }, { status: 500 });
  }
}
