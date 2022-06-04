import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailingService {
  private readonly logger = new Logger(MailingService.name);
  private transporter: nodemailer.Transporter;

  initMailingService = async () => {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.sendgrid.net',
      port: 465,
      secure: true,
      auth: {
        user: 'apikey',
        pass: process.env.SENDGRID_API_KEY ?? 'null',
      },
    });
    this.logger.log('Mail transporter created.');
  };

  sendEmail = async (email: string, emailContent: string) => {
    this.transporter.verify(async (error, success) => {
      if (error) {
        this.logger.error(`Failed to send email with ${error}`);
      }
      if (success) {
        this.transporter
          .sendMail({
            from: '"🍍 A-COMOSUS 🍍" <project.a.comosus@gmail.com>',
            to: email,
            subject: `Reset Password`,
            text: emailContent,
            html: emailContent,
          })
          .then(() => {
            this.logger.log('Email sent successfully!');
          })
          .catch((error) => {
            this.logger.error(`Failed to send email with ${error}`);
          });
      }
    });
  };
}
