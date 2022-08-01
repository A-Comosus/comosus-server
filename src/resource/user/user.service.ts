import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { isNil } from 'lodash';
import { addHours } from 'date-fns';
import 'crypto';

import {
  CreateUserInput,
  OnboardUserInput,
  UpdateProfileInput,
  VerifyAccountSendEmailInput,
} from './dto';
import { PrismaService, AxiosService } from '@src/common';
import { EnvVar, UserStatus } from '@src/constants';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
    private readonly axiosService: AxiosService,
  ) {}

  async create(_createUserInput: CreateUserInput) {
    this.logger.log(`Created user with username ${_createUserInput.username}.`);
    return await this.prisma.user.create({
      data: {
        ..._createUserInput,
        status: UserStatus.Registered,
        timeAcceptPolicy: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    });
  }

  async onboardUser({ id, displayName, categoryId }: OnboardUserInput) {
    this.logger.log(`Onboarded user of id ${id}.`);

    if (
      isNil(
        await this.prisma.category.findUnique({
          where: { id: categoryId },
        }),
      )
    )
      this.logger.error(`Cannot found category of id ${categoryId}.`);

    return await this.prisma.user.update({
      where: { id },
      data: {
        displayName,
        categoryId,
        status: UserStatus.Onboarded,
        updatedAt: new Date().toISOString(),
      },
    });
  }

  async verifyAccountSendEmail({ id }: VerifyAccountSendEmailInput) {
    const user = await this.findById(id);
    const { email, username } = user;
    const verifyEmailLink = `${process.env.CLIENT_BASE_URL}verify-account/${id}`;
    const subject = 'Please verify your A-Comosus account';
    const emailContent = `<b>Hi ${username} 👋</b> 
    <p>Please verify your A-Comosus account following the link: </p> 
    <a>${verifyEmailLink}</a>
    <br>
    <br>
    <b>A-COMOSUS🍍</b>`;

    const result = await this.axiosService.sendEmail({
      email,
      subject,
      emailContent,
    });

    if (!result) {
      this.logger.error(
        `No result returned from sendEmail service for ${email}`,
      );
    }
    this.logger.log('Account verification email sent successfully ...');
    return true;
  }

  async findAll() {
    this.logger.log(`Returning data of all user registered.`);
    return await this.prisma.user.findMany();
  }

  async findById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (isNil(user)) {
      this.logger.error(`Cannot found user with id ${id}`);
    } else {
      this.logger.log(`Found data of user with id ${id}`);
      return user;
    }
  }

  async findByUsername(_username: string) {
    const user = await this.prisma.user.findFirst({
      where: { username: _username },
      include: {
        links: {
          where: { isDraft: false, isVisible: true },
          orderBy: { order: 'asc' },
        },
      },
    });

    if (user) {
      this.logger.log(`Found data of user with username ${_username}`);
      return user;
    } else {
      this.logger.error(`User with username ${_username} does not exist`);
    }
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
    const passwordResetToken = createHmac(
      'sha256',
      this.configService.get(EnvVar.CryptoSecret),
    )
      .update(token)
      .digest('hex');
    const passwordResetTokenExpires = addHours(new Date(), 1).toISOString();
    await this.updateUserById(id, {
      passwordResetToken,
      passwordResetTokenExpires,
    });
    this.logger.log(`Create password reset token for user with id ${id}.`);
    return `${this.configService.get(
      EnvVar.ClientBaseUrl,
    )}/reset-password/${passwordResetToken}`;
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

  async updateProfile({ id, displayName, bio }: UpdateProfileInput) {
    const updatedData = {
      displayName,
      bio,
    };
    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: {
        ...updatedData,
        updatedAt: new Date().toISOString(),
      },
    });
    if (updatedUser) {
      this.logger.log(`Updated user profile of ${id}.`);
      return updatedUser;
    } else {
      this.logger.error(`Errored when updating user profile of ${id}.`);
    }
  }
}
