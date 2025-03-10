import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  const transporter = nodemailer.createTransport({
    host: 'smtp.titan.email',
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    const body = await request.json();
    const { to, subject, text, html } = body;

    if (!to || !subject || !text) {
      return NextResponse.json({ error: 'Campos obrigatórios ausentes' }, { status: 400 });
    }

    await transporter.sendMail({
      from: `"Claudinho Celulares" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
      html,
    });

    return NextResponse.json({ message: 'E-mail enviado com sucesso!' });
  } catch (error) {
    console.error('Erro ao enviar e-mail:', error);
    return NextResponse.json({ error: 'Erro ao enviar o e-mail' }, { status: 500 });
  }
}
