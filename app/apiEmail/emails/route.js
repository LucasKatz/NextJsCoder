// route.js

import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    console.log("Request received:", request.body);
    const { name, surname, email, message, phone } = await request.json();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.NEXT_PUBLIC_NODEMAILER_USER,
        pass: process.env.NEXT_PUBLIC_NODEMAILER_PASSWORD,
      },
      logger: true,
      debug: true,
    });

    const mailOption = {
      from: 'careeros@tryporpra.com',
      to: 'night.owl.resources@gmail.com',
      subject: "Send Email Tutorial",
      html: `
        <h1>Night Owl Resources New Message </h1>
        <h3>User: ${name} ${surname}</h3>
        <p>Email: ${email}</p>
        <p>Phone: ${phone}</p>
        <p>Message: ${message}</p>
      `,
    };

    await transporter.sendMail(mailOption);

    return NextResponse.json({ message: "Email Sent Successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ message: "Failed to Send Email" }, { status: 500 });
  }
}
