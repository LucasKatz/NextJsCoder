import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { emailContent } = await request.json(); // Obtener el contenido del correo electrónico desde la solicitud

    // Configurar el transportador de nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NEXT_PUBLIC_NODEMAILER_PASSWORD,
      },
    });

    // Configurar las opciones de correo electrónico
    const mailOptions = {
      from: 'careeros@tryporpra.com',
      to: 'night.owl.resources@gmail.com', // Correo del administrador (puedes cambiarlo)
      subject: 'Ticket de compra', // Asunto del correo electrónico
      html: emailContent, // Cuerpo del correo electrónico
    };

    // Enviar el correo electrónico con el contenido proporcionado
    await transporter.sendMail(mailOptions);

    // Enviar una respuesta de éxito
    return NextResponse.json({ message: "Email Sent Successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ message: "Failed to Send Email" }, { status: 500 });
  }
}

