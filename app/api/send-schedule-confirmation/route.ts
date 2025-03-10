import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const headers = new Headers();
  headers.set('Access-Control-Allow-Origin', '*');

  try {
    const { name, email, date, time, whatsapp } = await request.json();

    // Validação básica
    if (!name || !email || !date || !time || !whatsapp) {
      return NextResponse.json(
        { message: 'Campos obrigatórios ausentes.' }, 
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

    // E-mail para o cliente
    const mailOptionsLead = {
      from: `"Marllon Celulares" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Confirmação do seu Agendamento 🎉',
      html: `
        <h1>Olá, ${name}!</h1>
        <p>Sua limpeza gratuita foi agendada com sucesso!</p>
        <ul>
          <li><strong>Data:</strong> ${date}</li>
          <li><strong>Hora:</strong> ${time}</li>
          <li><strong>WhatsApp:</strong> ${whatsapp}</li>
        </ul>
        <p>Endereço: [INSIRA SEU ENDEREÇO AQUI]</p>
        <p>Equipe Marllon Celulares</p>
      `
    };

    // E-mail para administração
    const mailOptionsAdmin = {
      from: `"Marllon Celulares" <${process.env.EMAIL_USER}>`,
      to: 'comercial@marlloncelulares.com',
      subject: '🔥 Novo Agendamento Recebido',
      html: `
        <h1>Novo Agendamento:</h1>
        <ul>
          <li><strong>Nome:</strong> ${name}</li>
          <li><strong>E-mail:</strong> ${email}</li>
          <li><strong>WhatsApp:</strong> ${whatsapp}</li>
          <li><strong>Data:</strong> ${date}</li>
          <li><strong>Hora:</strong> ${time}</li>
        </ul>
      `
    };

    await transporter.sendMail(mailOptionsLead);
    await transporter.sendMail(mailOptionsAdmin);

    return NextResponse.json(
      { message: 'E-mails enviados com sucesso!' }, 
      { status: 200, headers }
    );

  } catch (error) {
    console.error('Erro no envio:', error);
    return NextResponse.json(
      { message: 'Erro ao enviar e-mails.' }, 
      { status: 500, headers }
    );
  }
}
