import { isNil } from 'lodash';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(LocalStrategy.name);
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    this.logger.log(`Validating user ${username}...`);
    const user = await this.authService.validateUser(username, password);

    if (isNil(user)) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
