import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getHello(userId: number): string {
    return 'Hello World!';
  }
}
