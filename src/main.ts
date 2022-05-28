import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';
import { AppModule } from './app.module';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  const config = app.get<ConfigService>(ConfigService);
  await app.listen(parseInt(config.get('PORT'), 10) ?? 3100);

  const prisma = new PrismaClient();
  prisma
    .$connect()
    .then(async () => {
      console.log('Connection to database has been established');
    })
    .catch((error) => {
      console.error(error);
    });
}
bootstrap();
