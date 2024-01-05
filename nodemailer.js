import nodemailer from 'nodemailer';

export function createTransporter() {
  return nodemailer.createTransport({
    host: 'smtp.example.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'l.katz92@gmail.com',
      pass: 'wgtmyxoujarkujym',
    },
  });
}