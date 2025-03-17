import nodemailer from 'nodemailer';

export async function POST(request: Request) {
    const { name, email, whatsapp } = await request.json();
    console.log('Variáveis de ambiente:', process.env.EMAIL_USER, process.env.EMAIL_PASS);

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

    try {
        await transporter.verify();
        console.log('Conexão SMTPS bem-sucedida');
    } catch (error) {
        console.error('Erro na conexão SMTPS:', error);
        return new Response(
            JSON.stringify({ error: 'Falha na conexão SMTPS' }),
            { status: 500 }
        );
    }

    await transporter.sendMail({
        from: `"Marllon Celulares" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Brinde Confirmado!',
        html: `<p>Obrigado, ${name}! Seu brinde foi confirmado.</p>`,
    });

    await transporter.sendMail({
        from: `"Marllon Celulares" <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_USER,
        subject: 'Novo Lead do Quiz',
        html: `<p>Novo lead: ${name}, ${email}, ${whatsapp}</p>`,
    });

    return new Response(
        JSON.stringify({ success: true }),
        { status: 200 }
    );
}