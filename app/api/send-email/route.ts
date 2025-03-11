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
      subject: 'Deu certo! Aqui está o que preparamos para você 🎉',
      html: `
        <h1>Olá, ${name}!</h1>
        <p>
          Prontinho! Aqui está o seu CUPOM com um descontão 🎉 Agora você pode garantir a nossa oferta especial do Redmi Note 13 Pro. Use este cupom abaixo:
        </p>
        <h2 style="color: #D32F2F;">CUPOM: #CLAUDINHOBLACK</h2>
        <strong>Por que o Redmi Note 13 Pro é a escolha perfeita para você:</strong>
        <ul>
          <li>📸 <strong>Fotos Incríveis:</strong> Capture momentos inesquecíveis com uma câmera de alta resolução.</li>
          <li>⚡ <strong>Desempenho Ultra-Rápido:</strong> Processador potente para tarefas e jogos.</li>
          <li>🔋 <strong>Bateria Duradoura:</strong> Use o dia inteiro sem preocupar com recarga.</li>
          <li>💎 <strong>Design Premium:</strong> Elegante e funcional, combina estilo e praticidade.</li>
          <li>🛡️ <strong>Proteção e Garantia:</strong> Suporte e qualidade garantida.</li>
        </ul>
        <p>Use o <strong>cupom exclusivo</strong> abaixo para garantir o desconto. Corra, é por tempo limitado!</p>
        <h2 style="color: #D32F2F;">CUPOM: #CLAUDINHOBLACK</h2>
        <p>👇 <a href="https://wa.me/5567981117396?text=Olá!%20Gostaria%20de%20saber%20mais%20sobre%20a%20oferta%20do%20Redmi%20Note%2013%20Pro!">Clique aqui</a> e fale com nossa equipe.</p>
        <p>Qualquer dúvida, estamos aqui para ajudar!</p>
        <p>Atenciosamente,<br>Time de marketing — Claudinho Celulares</p>
      `,
    };

    const mailOptionsAdmin = {
      from: process.env.EMAIL_USER,
      to: 'agendamentos@claudinhocelulares.com.br',
      subject: 'Novo Lead Capturado 🎉',
      html: `
        <h1>Olá, Claudinho Celulares!</h1>
        <p>Um novo lead foi capturado pelo sistema através da LP Redmi Note 13 Pro. Aqui estão os detalhes:</p>
        <ul>
          <li><strong>Nome:</strong> ${name}</li>
          <li><strong>E-mail:</strong> ${email}</li>
          <li><strong>WhatsApp:</strong> ${whatsapp}</li>
        </ul>
        <p>Entre em contato com o cliente para dar seguimento.</p>
        <p>Atenciosamente,<br>Equipe Claudinho Celulares</p>
      `,
    };

    await Promise.all([
      transporter.sendMail(mailOptionsLead),
      transporter.sendMail(mailOptionsAdmin),
    ]);

    return NextResponse.json({ message: 'E-mails enviados com sucesso!' }, { status: 200 });
  } catch (error) {
    console.error('Erro ao enviar e-mails:', error);
    return NextResponse.json({ message: 'Erro ao enviar e-mails.' }, { status: 500 });
  }
}
