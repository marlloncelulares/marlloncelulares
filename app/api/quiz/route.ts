import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const headers = new Headers();
  headers.set('Access-Control-Allow-Origin', '*');

  try {
    const { name, email, whatsapp } = await request.json();

    // Validação robusta
    const whatsappRegex = /^\+[1-9]\d{1,14}$/;
    if (!whatsappRegex.test(whatsapp)) {
      return NextResponse.json(
        { message: 'Formato de WhatsApp inválido. Use +DDI...' },
        { status: 400, headers }
      );
    }

    // Configuração SMTP
    const transporter = nodemailer.createTransport({
      host: 'smtp.titan.email',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // E-mails
    await transporter.sendMail({
      from: `"Marllon Celulares" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: '🎁 Brinde Confirmado!',
      html: `
        <h1>Olá ${name}!</h1>
        <p>Seu brinde está reservado! Apresente este e-mail em nossa loja:</p>
        <p><strong>Local:</strong> [ENDEREÇO DA LOJA]</p>
      `
    });

    await transporter.sendMail({
      from: `"Marllon Celulares" <${process.env.EMAIL_USER}>`,
      to: 'comercial@marlloncelulares.com',
      subject: '🔥 Novo Lead do Quiz',
      html: `
        <h3>Novo participante:</h3>
        <ul>
          <li>Nome: ${name}</li>
          <li>E-mail: ${email}</li>
          <li>WhatsApp: ${whatsapp}</li>
        </ul>
      `
    });

    return NextResponse.json(
      { message: 'E-mails enviados!' }, 
      { status: 200, headers }
    );

  } catch (error) {
    console.error('Erro no quiz:', error);
    return NextResponse.json(
      { message: 'Erro interno' }, 
      { status: 500, headers }
    );
  }
}
