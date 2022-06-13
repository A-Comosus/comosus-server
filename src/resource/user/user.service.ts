import { Injectable, Logger } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import 'crypto';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const addHours = require('date-fns/addHours');
import { PrismaService } from '@src/common';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  constructor(private readonly prisma: PrismaService) {}

  async create(_createUserInput: CreateUserInput) {
    this.logger.log(`Created user with username ${_createUserInput.username}.`);
    return await this.prisma.user.create({
      data: {
        ..._createUserInput,
        timeAcceptPolicy: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
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
    return await this.prisma.user.findFirst({ where: { email: _email } });
  }

  async findByResetPasswordToken(_resetToken: string) {
    return this.prisma.user.findFirst({
      where: { passwordResetToken: _resetToken },
    });
  }

  async createPasswordResetLink(id: string) {
    const { createHmac, randomBytes } = await import('crypto');
    const token = randomBytes(32).toString('hex');
    const passwordResetToken = createHmac('sha256', process.env.CRYPTO_SECRET)
      .update(token)
      .digest('hex');
    const passwordResetTokenExpires = addHours(new Date(), 1).toISOString();
    await this.updateUserById(id, {
      passwordResetToken,
      passwordResetTokenExpires,
    });
    this.logger.log(`Create password reset token for user with id ${id}.`);
    return `${process.env.CLIENT_BASE_URL}/reset-password/${passwordResetToken}`;
  }

  async resetPassword(id: string, password: string) {
    this.logger.log(`Password reset successfully`);
    await this.updateUserById(id, {
      password,
      passwordResetToken: null,
      passwordResetTokenExpires: null,
    });
    return true;
  }

  async updateUserById(id: string, updateUserData: UpdateUserDataType) {
    return await this.prisma.user.update({
      where: { id },
      data: {
        ...updateUserData,
        updatedAt: new Date().toISOString(),
      },
    });
  }
}
