import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'secret', // TODO: Fetch this from environment
      logging: true,
    });
  }

  /**
   * Store decoded jwt token back to context
   * Can be accesed via (@Context() context) in resolver query/mutation params
   */
  async validate({ sub, username }: any) {
    return { userId: sub, username };
  }
}
