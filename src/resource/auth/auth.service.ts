import { Injectable, Logger } from '@nestjs/common';
import { User } from '@src/resource/user/entities/user.entity';
import { UserService } from '@src/resource/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { ForgetPasswordInput, RegisterDetailInput } from './dto';
import * as bcrypt from 'bcrypt';
import { isNil } from 'lodash';
import { sendEmail } from '@src/utils/sendEmail';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(_username: string, _password: string): Promise<any> {
    this.logger.log(`Validating user ${_username}...`);
    const user = await this.userService.findByUsername(_username);
    if (isNil(user)) {
      this.logger.error(`User ${_username} does not exist.`);
    }

    const isValid = await bcrypt.compare(_password, user?.password);
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

  async register(_registerDetail: RegisterDetailInput) {
    const { email, username, acceptPolicy } = _registerDetail;
    this.logger.log(`Registering user ${username}...`);

    const user = await this.userService.findByUsername(username);
    if (user) {
      this.logger.error(`User ${username} already registered`);
    }

    if (!acceptPolicy) {
      this.logger.error(`User ${username} did not accept policy`);
    }

    const password = await bcrypt.hash(_registerDetail.password, 10);

    return this.userService.create({ email, username, password, acceptPolicy });
  }

  async forgetPasswordSendEmail(forgetPasswordInput: ForgetPasswordInput) {
    this.logger.log(
      `Sending password reset email to ${forgetPasswordInput.email}...`,
    );

    const { email } = forgetPasswordInput;
    const user = await this.userService.findByEmail(email);
    if (!user) {
      this.logger.error(
        `User with email ${forgetPasswordInput.email} does not exist`,
      );
    } else {
      const { id, username } = user;
      const resetLink = await this.userService.createPasswordResetLink(id);
      const emailContent = `<b>Hi ${username} 👋</b> 
                            <p>We've received a request to reset your password, please click the link: </p> 
                            <a>${resetLink}</a>
                            <br>
                            <br>
                            <b>A-COMOSUS🍍</b>`;
      sendEmail(email, emailContent);
    }
    return true;
  }
}
