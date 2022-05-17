import { Injectable } from '@nestjs/common';
import { App } from './app.entity';

@Injectable()
export class AppService {
  getServerInfo(): App {
    // TODO: Server initialization validation goes here maybe
    return { status: 'Server is up' };
  }
}
