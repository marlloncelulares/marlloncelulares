import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { name, email, date, time, whatsapp, problema } = await request.json();

    if (!name || !email || !date || !time || !problema) {
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

    // E-mail para o cliente
    const mailOptionsLead = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Seu conserto está agendado! 🔧 Aqui está o que você precisa saber',
      html: `
        <h1>Olá, ${name}!</h1>
        <p>Seu conserto com o <strong>Mestre dos Celulares</strong> está agendado com sucesso! 🚀</p>
        <h3>🗓️ Detalhes do seu agendamento:</h3>
        <ul>
          <li><strong>Problema:</strong> ${problema}</li>
          <li><strong>Data:</strong> ${date}</li>
          <li><strong>Horário:</strong> ${time}</li>
          <li><strong>Endereço:</strong> Rua do Progresso, 48a - Primeiro de Maio, Itamarandiba - MG</li>
        </ul>
        <h3>Como se preparar para o conserto?</h3>
        <ul>
          <li>🔋 Certifique-se de que o celular está carregado ou traga o carregador.</li>
          <li>📋 Faça backup dos seus dados importantes antes do conserto.</li>
          <li>📞 Traga o aparelho e qualquer acessório relevante para o diagnóstico.</li>
        </ul>
        <p>💡 Adicione ao calendário para não perder a data!</p>
        <p>Se tiver dúvidas, <a href="https://wa.me/5538984184684">clique aqui</a> e fale comigo no WhatsApp!</p>
        <p>Atenciosamente,<br>Marllon Celulares - O Mestre dos Celulares</p>
      `,
    };

    // E-mail para você (comercial@marlloncelulares.com)
    const mailOptionsAdmin = {
      from: process.env.EMAIL_USER,
      to: 'comercial@marlloncelulares.com',
      subject: 'Novo agendamento de conserto recebido! 🔧',
      html: `
        <h1>Olá, Marllon Celulares!</h1>
        <p>Você recebeu um novo agendamento de conserto. Confira os detalhes:</p>
        <h3>🗓️ Detalhes do agendamento:</h3>
        <ul>
          <li><strong>Nome:</strong> ${name}</li>
          <li><strong>E-mail:</strong> ${email}</li>
          <li><strong>WhatsApp:</strong> ${whatsapp}</li>
          <li><strong>Problema:</strong> ${problema}</li>
          <li><strong>Data:</strong> ${date}</li>
          <li><strong>Horário:</strong> ${time}</li>
        </ul>
        <p>Entre em contato com o cliente para confirmar e organizar o atendimento!</p>
        <p>Atenciosamente,<br>Equipe de suporte</p>
      `,
    };

    // Envio dos e-mails
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
