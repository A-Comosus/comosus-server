import { Injectable, Logger } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import 'crypto';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const addHours = require('date-fns/addHours');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const compareAsc = require('date-fns/compareAsc');
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

  async findByUsername(_username: string) {
    this.logger.log(`Found data of user with username ${_username}`);
    return this.prisma.user.findFirst({ where: { username: _username } });
  }

  async findByEmail(_email: string) {
    this.logger.log(`Found data of user with email ${_email}`);
    return this.prisma.user.findFirst({ where: { email: _email } });
  }

  async findByResetPasswordToken(_resetToken: string) {
    const user = await this.prisma.user.findFirst({
      where: { passwordResetToken: _resetToken },
    });
    const { passwordResetTokenExpires } = user;
    const expire_time = Date.parse(passwordResetTokenExpires);
    const now = new Date().getTime();
    const compare = compareAsc(expire_time, now);
    if (compare === 1) {
      this.logger.log(`Password reset for user ${user.username}`);
      return user;
    }
    if (compare !== 1) {
      this.logger.error(`User ${user.username}'s resetPasswordToken expired`);
      return null;
    }
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

  async resetPassword(_id: string, _newPassword: string) {
    return await this.prisma.user.update({
      where: {
        id: _id,
      },
      data: {
        password: _newPassword,
        passwordResetToken: '',
        passwordResetTokenExpires: '',
      },
    });
  }
}
