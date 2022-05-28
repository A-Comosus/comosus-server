import {
  INestApplication,
  Injectable,
  Logger,
  OnModuleInit,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect()
      .then(async () => {
        Logger.log('Connection to database has been established');
      })
      .catch((error) => {
        Logger.error(error);
      });
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      Logger.log('Shutting down connection to database.');
      await app.close();
    });
  }
}
