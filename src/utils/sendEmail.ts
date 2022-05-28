import * as nodemailer from 'nodemailer';

export const sendEmail = async (email: string, emailContent: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.sendgrid.net',
    port: 465,
    secure: true,
    auth: {
      user: 'apikey',
      pass: process.env.SENDGRID_API_KEY,
    },
  });

  await transporter.sendMail({
    from: '"🍍 A-COMOSUS 🍍" <project.a.comosus@gmail.com>',
    to: email,
    subject: `Reset Password`,
    text: emailContent,
    html: emailContent,
  });

  console.log('Email sent successfully!');
};
