import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import 'crypto';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const addHours = require('date-fns/addHours');
import { PrismaService } from '@src/common';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(_createUserInput: CreateUserInput) {
    const newUserData = {
      ..._createUserInput,
      timeAcceptPolicy: new Date().toISOString(),
    };
    return await this.prisma.user.create({
      data: newUserData,
    });
  }

  async findAll() {
    return await this.prisma.user.findMany();
  }

  async findByUsername(_username: string) {
    return this.prisma.user.findFirst({ where: { username: _username } });
  }

  async findByEmail(_email: string) {
    return this.prisma.user.findFirst({ where: { email: _email } });
  }

  async createPasswordResetLink(_id: string) {
    const { createHmac, randomBytes } = await import('crypto');
    const token = randomBytes(32).toString('hex');
    const resetToken = createHmac('sha256', process.env.CRYPTO_SECRET)
      .update(token)
      .digest('hex');
    const resetTokenExpires = addHours(new Date(), 1).toISOString();
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
