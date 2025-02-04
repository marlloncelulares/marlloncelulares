import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  // Configurar o transporte do Nodemailer
  const transporter = nodemailer.createTransport({
    host: 'smtp.titan.email', // Servidor SMTP do Titan Mail
    port: 587, // Porta padrão para envio SMTP com TLS
    secure: false, // TLS
    auth: {
      user: process.env.EMAIL_USER, // Endereço de e-mail Titan
      pass: process.env.EMAIL_PASS, // Senha do Titan Mail
    },
  });

  try {
    // Receber os dados do cliente
    const body = await request.json();
    const { to, subject, text, html } = body;

    if (!to || !subject || !text) {
      return NextResponse.json({ error: 'Campos obrigatórios ausentes' }, { status: 400 });
    }

    // Enviar e-mail
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
