import { INestApplication, Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

const logger = new Logger('SwaggerDoc');

const config = new DocumentBuilder()
  .setTitle('A-Comosus')
  .setDescription('A-Comosus Monolithic Server APIs')
  .setVersion('1.0')
  .addTag('Auth')
  .addTag('User')
  .addTag('Link')
  .addBearerAuth()
  .build();

export const setupSwagger = (_app: INestApplication) => {
  const swaggerDocument = SwaggerModule.createDocument(_app, config);
  SwaggerModule.setup('api', _app, swaggerDocument);
  logger.log('Swagger UI has been initialized');
};
