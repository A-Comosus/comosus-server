import { Injectable } from '@nestjs/common';
import { User } from '@src/user/entities/user.entity';
import { UserService } from '@src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { LoginUserInput } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findByUsername(username);

    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async login(user: User) {
    return {
      accessToken: this.jwtService.sign({
        username: user.username,
        sub: user.id,
      }),
      user,
    };
  }

  async register({ username, password }: LoginUserInput) {
    const user = await this.userService.findByUsername(username);
    if (user) {
      throw new Error(`User ${username} already registered`);
    }

    return this.userService.create({ username, password });
  }
}
