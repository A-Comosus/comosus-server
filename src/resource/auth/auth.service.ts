import { Injectable, Logger } from '@nestjs/common';
import { User } from '@src/resource/user/entities/user.entity';
import { UserService } from '@src/resource/user/user.service';
import { JwtService } from '@nestjs/jwt';
import {
  ForgetPasswordInput,
  RegisterInput,
  ResetPasswordInput,
  VerifyEmailInput,
} from './dto';
import * as bcrypt from 'bcrypt';
import { compareAsc } from 'date-fns';
import { isNil } from 'lodash';
import { AxiosService } from '@src/common';
import { QueryError, UserStatus } from '@src/constants';
import { matches } from 'class-validator';
import { Prisma } from '@prisma/client';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly axiosService: AxiosService,
  ) {}

  async validateUser(username: string, password: string): Promise<User | null> {
    this.logger.log(`Validating user ${username}...`);
    const user = await this.userService.findByUsername(username);
    if (isNil(user)) {
      this.logger.warn(
        `Failed when validating user ${username}, user does not exist.`,
      );
      return null;
    }

    const isValid = await bcrypt.compare(password, user?.password);
    if (isValid) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async login(user: User) {
    this.logger.log(`Logged in user ${user.username}.`);
    return {
      accessToken: this.jwtService.sign({
        username: user.username,
        sub: user.id,
      }),
      user,
    };
  }

  async register(detail: RegisterInput) {
    const { email, username, acceptPolicy } = detail;

    if (!acceptPolicy) {
      this.logger.warn(`User ${email} did not accept policy`);
      return {
        code: 'Aceept_Policy',
        message: 'User did not accept policy agreements',
        key: 'policy',
      };
    }

    if (!matches(username, /^[a-z0-9]*$/g)) {
      this.logger.warn(`User ${email} did not match username regex.`);
      return {
        code: 'Regex_Username',
        message:
          'Username must only contian lowercase alphanumeric characters.',
        key: 'regex.username',
      };
    }

    const password = await bcrypt.hash(detail.password, 10);

    try {
      const user = await this.userService.create({
        email,
        username,
        password,
        acceptPolicy,
      });

      return {
        user,
        accessToken: this.jwtService.sign({
          username: user.username,
          sub: user.id,
        }),
      };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        const { code, meta } = error;
        if (code === QueryError.UniqueConstraintFailed) {
          const key = (meta?.target as string)
            .replace('User_', '')
            .replace('_key', '');
          const message = `Request failed when registering user ${detail.username}. [${code}: ${meta?.target} failed unique constraint]`;
          return {
            code,
            key,
            message,
          };
        }
      }
    }
  }

  async verifyUserEmail({ id }: VerifyEmailInput) {
    const user = await this.userService.findById(id);
    if (!user) {
      this.logger.error(`User with id ${id} does not exist`);
    } else {
      this.logger.log(`Verifying user with id ${id} ...`);
      this.userService.updateUserById(id, {
        status: UserStatus.Verified,
      });
      this.logger.log(`Verified user with id ${id} successfully`);
      return true;
    }
  }

  async forgetPasswordSendEmail({ email }: ForgetPasswordInput) {
    const user = await this.userService.findByEmail(email);

    if (!user) {
      this.logger.error(`User with email ${email} does not exist`);
      return;
    } else {
      const { id, username } = user;
      const resetLink = await this.userService.createPasswordResetLink(id);
      const emailContent = `<b>Hi ${username} 👋</b> 
          <p>We've received a request to reset your password, please click the link: </p> 
          <a href="${resetLink}">${resetLink}</a>
          <br>
          <br>
          <b>A-COMOSUS🍍</b>`;
      this.logger.log(
        `Sending password reset email to ${email} through Lambda function`,
      );
      const subject = 'Your Password Reset Link';
      const result = await this.axiosService.sendEmail({
        email,
        subject,
        emailContent,
      });
      this.logger.log('axiosService.sendEmail result', result);
      if (!result) return false;
      return true;
    }
  }

  async resetPassword({ resetToken, password }: ResetPasswordInput) {
    const user = await this.userService.findByResetPasswordToken(resetToken);
    if (!user) {
      this.logger.error('Invalid link or link expired');
    } else {
      const { id, passwordResetTokenExpires } = user;
      const expire_time = Date.parse(passwordResetTokenExpires);
      const now = new Date().getTime();
      if (compareAsc(expire_time, now) === 1) {
        const newPassword = await bcrypt.hash(password, 10);
        this.logger.log(`Creating newPassword for user ${user.username}`);
        return this.userService.resetPassword(id, newPassword);
      } else {
        this.logger.error(`User ${user.username}'s resetPasswordToken expired`);
        return false;
      }
    }
  }
}
