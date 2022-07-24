import { Injectable, Logger } from '@nestjs/common';
import { User } from '@src/resource/user/entities/user.entity';
import { UserService } from '@src/resource/user/user.service';
import { JwtService } from '@nestjs/jwt';
import {
  ForgetPasswordInput,
  RegisterDetailInput,
  ResetPasswordInput,
} from './dto';
import * as bcrypt from 'bcrypt';
import { compareAsc } from 'date-fns';
import { isNil } from 'lodash';
import { AxiosService } from '@src/common';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly axiosService: AxiosService,
  ) {}

  async validateUser(_username: string, _password: string): Promise<any> {
    this.logger.log(`Validating user ${_username}...`);
    const user = await this.userService.findByUsername(_username);
    if (isNil(user)) {
      this.logger.error(`User ${_username} does not exist.`);
      return;
    }

    const isValid = await bcrypt.compare(_password, user?.password);
    if (isValid) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    } else {
      this.logger.error(`Credential does not match for user ${_username} `);

      return;
    }
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

  async register(_registerDetail: RegisterDetailInput) {
    const { email, username, acceptPolicy } = _registerDetail;
    this.logger.log(
      `Registering {username: ${username}, email: ${email}} as new user...`,
    );

    if (!acceptPolicy) {
      this.logger.error(`User ${username} did not accept policy`);
      return;
    }

    const password = await bcrypt.hash(_registerDetail.password, 10);

    const { id, username: _username } = await this.userService.create({
      email,
      username,
      password,
      acceptPolicy,
    });

    return {
      id,
      accessToken: this.jwtService.sign({
        username: _username,
        sub: id,
      }),
    };
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
          <a>${resetLink}</a>
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
