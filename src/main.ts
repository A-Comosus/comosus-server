import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';
import { AppModule } from './resource/app/app.module';
import { setupSwagger } from './config';
import { PrismaService } from '@common';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  const config = app.get<ConfigService>(ConfigService);

  setupSwagger(app);

  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  await app.listen(parseInt(config.get('PORT'), 10) ?? 3100);
  Logger.log(`Server listening on ${await app.getUrl()}`);
}
bootstrap();
