import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get<ConfigService>(ConfigService);
  await app.listen(parseInt(config.get('PORT'), 10) ?? 3100);

  const prisma = new PrismaClient();
  prisma
    .$connect()
    .then(async () => {
      console.log('Connection to database has been established');
      await prisma.user.deleteMany();
      console.log('Existing data has been deleted on connected');
    })
    .catch((error) => {
      console.error(error);
    });
}
bootstrap();
