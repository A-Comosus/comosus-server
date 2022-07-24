import { Injectable, Logger } from '@nestjs/common';
import { App } from './app.entity';
import { ContactFormInput } from './dto';
import { AxiosService } from '@src/common';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);
  constructor(private readonly axiosService: AxiosService) {}
  getServerInfo(): App {
    this.logger.log('Responding with server information...');
    return { status: 'Server is up' };
  }

  async contactForm(_contactForm: ContactFormInput) {
    const { customerName, email, phone, message } = _contactForm;
    this.logger.log(
      `Receiving contact form from customerName: ${customerName}, email: ${email}`,
    );

    const emailContent = `<b>Hi A-COMOSUS🍍👋</b> 
          <p>You've received a contact message, please see details as below:</p> 
          <br>
          <br>
          <b>Name: ${customerName} </b>
          <b>E-mail: ${email} </b>
          <b>phone: ${phone} </b>
          <p>Message:${message}</p>`;
    this.logger.log(
      `Sending customer contact request to project.a.comosus@gmail.com through Lambda function`,
    );
    const subject = 'Receive a contact form';
    const result = await this.axiosService.sendEmail({
      email,
      subject,
      emailContent,
    });
    this.logger.log('axiosService.sendEmail result', result);
    if (!result) return false;
    return true;
  }
}
