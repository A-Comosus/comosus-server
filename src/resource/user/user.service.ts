import { Injectable, Logger } from '@nestjs/common';
import { isNil } from 'lodash';
import 'crypto';

import { CreateUserInput } from './dto/create-user.input';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const addHours = require('date-fns/addHours');
import { PrismaService } from '@src/common';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  constructor(private readonly prisma: PrismaService) {}

  async create(_createUserInput: CreateUserInput) {
    this.logger.log(`Created user with username ${_createUserInput.username}.`);
    const newUserData = {
      ..._createUserInput,
      timeAcceptPolicy: new Date().toISOString(),
    };
    return await this.prisma.user.create({
      data: newUserData,
    });
  }

  async findAll() {
    this.logger.log(`Returning data of all user registered.`);
    return await this.prisma.user.findMany();
  }

  async findById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: { links: true },
    });

    if (isNil(user)) {
      this.logger.error(`Cannot found user with id ${id}`);
    } else {
      this.logger.log(`Found data of user with id ${id}`);
      return user;
    }
  }

  async findByUsername(_username: string) {
    this.logger.log(`Found data of user with username ${_username}`);
    return this.prisma.user.findFirst({ where: { username: _username } });
  }

  async findByEmail(_email: string) {
    this.logger.log(`Found data of user with email ${_email}`);
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
    this.logger.log(`Create password reset token for user with id ${_id}.`);
    return `${process.env.CLIENT_BASE_URL}/reset-password/${resetToken}`;
  }
}
