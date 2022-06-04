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
import { isNil } from 'lodash';
import { MailingService } from '@common';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly mailingService: MailingService,
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

    const user = await this.userService.findByUsername(username);
    if (user) {
      this.logger.error(`User ${username} already registered.`);
      return;
    }

    if (!acceptPolicy) {
      this.logger.error(`User ${username} did not accept policy`);
      return;
    }

    const password = await bcrypt.hash(_registerDetail.password, 10);

    return this.userService.create({ email, username, password, acceptPolicy });
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
      this.logger.log(`Sending password reset email to ${email}...`);
      this.mailingService.sendEmail(email, emailContent);
    }
    return true;
  }

  async resetPassword(_resetDetail: ResetPasswordInput) {
    const { resetToken, password } = _resetDetail;
    const user = await this.userService.findByResetPasswordToken(resetToken);
    if (!user) {
      this.logger.error('Invalid link or link expired');
    }

    const { id } = user;
    const newPassword = await bcrypt.hash(password, 10);
    this.logger.log(`Creating newPassword`);
    this.userService.resetPassword(id, newPassword);
    return true;
  }
}
