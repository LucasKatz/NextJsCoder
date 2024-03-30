import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    const { emailContent } = await request.json();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NEXT_PUBLIC_NODEMAILER_PASSWORD,
      },
      logger: true,
      debug: true,
    });

    const mailOption = {
      from: 'careeros@tryporpra.com',
      to: 'night.owl.resources@gmail.com', // Cambiar al correo destinatario adecuado
      subject: "Night Owl Resources Purchase Ticket",
      text: emailContent, // Aquí se pasa el contenido del email generado como texto
    };

    console.log(emailContent,"aca es route.js")

    await transporter.sendMail(mailOption);

    return NextResponse.json({ message: "Email Sent Successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ message: "Failed to Send Email" }, { status: 500 });
  }
}
