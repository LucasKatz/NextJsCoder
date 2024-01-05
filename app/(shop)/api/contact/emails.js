
import { createTransporter } from "@/nodemailer";
import Cors from "cors"

const cors = Cors({
  methods: ['POST'],
});


export default async function handler(req, res) {

    cors(req, res);

    if (req.method === 'POST') {
        const { name, surname, phone, email, message } = req.body;

    const emailContent = {
      name,
      surname,
      phone,
      message,
    };

    const transporter = createTransporter();

    if (!transporter) {
      console.error('Error: transporter is null.');
      return res.status(500).json({ success: false, error: 'Error al enviar el correo.' });
    }

    const mailOptions = {
      from: email,
      to: 'l.katz92@gmail.com',
      subject: 'Night Owl Resources Contact Form',
      text: JSON.stringify(emailContent, null, 2),
    };

    try {
      await transporter.sendMail(mailOptions);
      return res.status(200).json({ success: true });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, error: 'Error al enviar el correo.' });
    }
  } else {
    res.status(405).json({ success: false, message: 'Método no permitido' });
  }
}
