import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { name, email, date, time, whatsapp } = await request.json();

    if (!name || !email || !date || !time || !whatsapp) {
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
      subject: 'Confirmação do seu Agendamento 🎉',
      html: `
        <h1>Olá, ${name}!</h1>
        <p>Sua limpeza gratuita foi agendada com sucesso!</p>
        <ul>
          <li><strong>Data:</strong> ${date}</li>
          <li><strong>Hora:</strong> ${time}</li>
        </ul>
      <p>Endereço: (seu endereço aqui)</p>
      <p>Obrigado pelo agendamento!</p>
      <p>Equipe Marllon Celulares</p>
    `};

    const mailOptionsAdmin = {
      from: process.env.EMAIL_USER,
      to: 'comercial@marlloncelulares.com',
      subject: 'Novo Agendamento Recebido',
      html: `
        <h1>Novo Agendamento Recebido:</h1>
        <ul>
          <li><strong>Nome:</strong> ${name}</li>
          <li><strong>E-mail:</strong> ${email}</li>
          <li><strong>WhatsApp:</strong> ${whatsapp}</li>
          <li><strong>Data:</strong> ${date}</li>
          <li><strong>Hora:</strong> ${time}</li>
        </ul>
      `,
    };

    await transporter.sendMail(mailOptionsLead);
    await transporter.sendMail(mailOptionsAdmin);

    return NextResponse.json({ message: 'E-mails enviados com sucesso!' }, { status: 200 });
  } catch (error) {
    console.error('Erro no envio:', error);
    return NextResponse.json({ message: 'Erro ao enviar e-mails.' }, { status: 500 });
  }
}
