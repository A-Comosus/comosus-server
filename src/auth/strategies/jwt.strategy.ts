import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretKey: 'secret', // TODO: Fetch this from environment
      loggin: true,
    });
  }

  /**
   *  Store decoded jwt token back to context
   */
  async validate({ sub, username }: any) {
    return { userId: sub, username };
  }
}
