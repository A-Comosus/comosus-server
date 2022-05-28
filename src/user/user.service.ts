import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { PrismaClient } from '@prisma/client';
import 'crypto';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const addHours = require('date-fns/addHours');
@Injectable()
export class UserService {
  prisma = new PrismaClient();

  async create(_createUserInput: CreateUserInput) {
    return await this.prisma.user.create({ data: _createUserInput });
  }

  async findAll() {
    return await this.prisma.user.findMany();
  }

  async findByUsername(_username: string) {
    return this.prisma.user.findFirst({ where: { username: _username } });
  }

  async createPasswordResetLink(_id: string) {
    const { createHmac, randomBytes } = await import('crypto');
    const secret = process.env.CRYPTO_SECRET;
    const token = randomBytes(32).toString('hex');
    const resetToken = createHmac('sha256', secret).update(token).digest('hex');
    const resetTokenExpires = addHours(new Date(), 1).toISOString();
    console.log(resetTokenExpires);
    await this.prisma.user.update({
      where: {
        id: _id,
      },
      data: {
        passwordResetToken: resetToken,
        passwordResetTokenExpires: resetTokenExpires,
      },
    });
    return `${process.env.CLIENT_BASE_URL}/reset-password/${resetToken}`;
  }
}
