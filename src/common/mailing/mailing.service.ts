import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

import { EnvVar } from '@src/constants';

@Injectable()
export class MailingService {
  private readonly logger = new Logger(MailingService.name);
  private transporter: nodemailer.Transporter;

  constructor(private readonly configService: ConfigService) {}

  initMailingService = async () => {
    const apiKey = this.configService.get(EnvVar.SendGridApiKey) ?? 'null';

    this.transporter = nodemailer.createTransport({
      host: 'smtp.sendgrid.net',
      port: 465,
      secure: true,
      auth: {
        user: 'apikey',
        pass: apiKey,
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
