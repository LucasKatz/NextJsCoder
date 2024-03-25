import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {

    if (!files || !files.pdf) {
        throw new Error("PDF file not found in request");
      }
  
      const { pdf } = files;

    console.log('PDF received:', pdf); // Registrar el PDF recibido

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
      html: '<p>Adjunto encontrarás el ticket de compra.</p>', // Cuerpo del correo electrónico
      attachments: [
        {
          filename: 'ticket.pdf', // Nombre del archivo adjunto
          content: pdf.data, // Contenido del archivo adjunto (PDF)
        },
      ],
    };

    console.log('Mail options:', mailOptions); // Registrar las opciones de correo electrónico

    // Enviar el correo electrónico con el PDF adjunto
    const info = await transporter.sendMail(mailOptions);

    console.log('Email sent:', info); // Registrar la información del correo electrónico enviado

    // Enviar una respuesta de éxito
    return NextResponse.json({ message: "Email Sent Successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ message: "Failed to Send Email" }, { status: 500 });
  }
}
