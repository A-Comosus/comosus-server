import { Injectable, Logger } from '@nestjs/common';
import { App } from './app.entity';
import { ContactFormInput } from './dto';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  getServerInfo(): App {
    this.logger.log('Responding with server information...');
    return { status: 'Server is up' };
  }

  async contactForm(_contactForm: ContactFormInput) {
    const { customerName, email, phone, message } = _contactForm;
    this.logger.log(
      `Receiving contact form from {customerName: ${customerName}, email: ${email}}`,
    );

    // Todo: pass customer input to database

    return { status: 'success' };
  }
}
