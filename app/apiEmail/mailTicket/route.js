import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';


export async function POST(request) {
  try {
    const { pdf } = request.files; // Obtener el PDF del cuerpo de la solicitud

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

    // Enviar el correo electrónico con el PDF adjunto
    await transporter.sendMail(mailOptions);

    // Enviar una respuesta de éxito
    return NextResponse.json({ message: "Email Sent Successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ message: "Failed to Send Email" }, { status: 500 });
  }
}
