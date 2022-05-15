import { Injectable } from '@nestjs/common';
import { User } from '@src/user/entities/user.entity';
import { UserService } from '@src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { UserDetailInput } from './dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, _password: string): Promise<any> {
    const user = await this.userService.findByUsername(username);
    const isValid = await bcrypt.compare(_password, user?.password);

    if (user && isValid) {
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

  async register(_userDetail: UserDetailInput) {
    const { username } = _userDetail;
    const user = await this.userService.findByUsername(username);
    if (user) {
      throw new Error(`User ${username} already registered`);
    }

    const password = await bcrypt.hash(_userDetail.password, 10);

    return this.userService.create({ username, password });
  }
}
