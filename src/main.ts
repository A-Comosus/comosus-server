import { Server } from 'http';
import express, { Express } from 'express';
import { ExpressAdapter } from '@nestjs/platform-express';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { Context } from 'aws-lambda';
import { createServer, proxy, Response } from 'aws-serverless-express';

import { PrismaService, MailingService, CustomLoggerService } from '@common';
import { AppModule } from './resource/app/app.module';
import { setupSwagger } from './config';

let cachedServer: Server;

async function createExpressApp(expressApp: Express) {
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressApp),
  );
  app.useGlobalPipes(new ValidationPipe());
  app.useLogger(app.get(CustomLoggerService));

  setupSwagger(app);

  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  const mailingService = app.get(MailingService);
  mailingService.initMailingService();

  return app;
}

async function bootstrap(): Promise<Server> {
  const expressApp = express();
  const app = await createExpressApp(expressApp);
  await await app.init();

  return createServer(expressApp);
}

export async function handler(event: any, context: Context): Promise<Response> {
  if (!cachedServer) {
    const server = await bootstrap();
    cachedServer = server;
  }
  return proxy(cachedServer, event, context, 'PROMISE').promise;
}
