import transporter from "@/nodemailer";

export default async function handler(req, res) {
    if (req.method === 'POST') {
    const { name, surname, phone, email, message } = req.body;

    const emailContent = {
        name,
        surname,
        phone,
        message,
    };

    const mailOptions = {
        from: email,
        to: 'destinatario@example.com',
        subject: 'Night Owl Resources Contact Form',
        text: JSON.stringify(emailContent),
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Error al enviar el correo.' });
    }
    } else {
        res.status(405).json({ success: false, message: 'Método no permitido' });
    }
}