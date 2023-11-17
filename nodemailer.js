const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'l.katz92@gmail.com"',
    pass: 'wgtmyxoujarkujym',
  },
});

module.exports = transporter;