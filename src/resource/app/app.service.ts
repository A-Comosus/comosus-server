import { Injectable, Logger } from '@nestjs/common';
import { App } from './app.entity';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);
  getServerInfo(): App {
    this.logger.log('Responding with server information...');
    return { status: 'Server is up' };
  }
}
