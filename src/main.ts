import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

const mockUsers = [
  { username: 'norris', email: 'example@email.com', password: 'norris' },
  { username: 'max', email: 'example@email.com', password: 'max' },
];

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get<ConfigService>(ConfigService);
  await app.listen(parseInt(config.get('PORT'), 10) ?? 3100);

  const prisma = new PrismaClient();
  prisma
    .$connect()
    .then(async () => {
      await prisma.user.deleteMany();
      await prisma.user.createMany({
        data: mockUsers,
      });

      const allUser = await prisma.user.findMany();
      console.log(allUser);
    })
    .catch((error) => {
      console.error(error);
    });
}
bootstrap();
