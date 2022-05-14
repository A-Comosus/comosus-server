import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

const mockUsers = [
  { id: 1, username: 'norris', password: 'norris' },
  { id: 2, username: 'max', password: 'max' },
];

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get<ConfigService>(ConfigService);
  await app.listen(parseInt(config.get('PORT'), 10) ?? 3100);

  const prisma = new PrismaClient();
  prisma.$connect().then(async () => {
    await prisma.user.create({
      data: {
        username: 'norriswu',
        email: 'norris.wu.au@outlook.com',
        password: 'secret',
      },
    });
  });

  const allUser = await prisma.user.findMany();
  console.log(allUser);
}
bootstrap();
