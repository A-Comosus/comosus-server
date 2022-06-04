import { Resolver, Query, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { JwtAuthGuard } from '@src/resource/auth/guards';
import { Logger, UseGuards } from '@nestjs/common';
import {
  FindByUsernameArgs,
  FindByEmailArgs,
  FindByResetPasswordTokenArgs,
} from './dto';

@Resolver(() => User)
export class UserResolver {
  private readonly logger = new Logger(UserResolver.name);
  constructor(private readonly userService: UserService) {}

  @Query(() => [User], { name: 'users' })
  @UseGuards(JwtAuthGuard)
  findAll() {
    this.logger.log(
      'Receiving request to return all user that is registered...',
    );
    return this.userService.findAll();
  }

  @Query(() => User, { name: 'userByUsername' })
  @UseGuards(JwtAuthGuard)
  findByUsername(@Args('username') { username }: FindByUsernameArgs) {
    this.logger.log(
      `Receiving request to find user with username ${username}...`,
    );
    return this.userService.findByUsername(username);
  }

  @Query(() => User, { name: 'userByEmail' })
  @UseGuards(JwtAuthGuard)
  findByEmail(@Args('email') { email }: FindByEmailArgs) {
    this.logger.log(`Receiving request to find user with email ${email}...`);
    return this.userService.findByEmail(email);
  }

  @Query(() => User, { name: 'userByResetPasswordToken' })
  @UseGuards(JwtAuthGuard)
  findByResetPasswordToken(
    @Args('resetPasswordToken')
    { resetPasswordToken }: FindByResetPasswordTokenArgs,
  ) {
    this.logger.log(`Receiving request to find user with resetPasswordToken`);
    return this.userService.findByResetPasswordToken(resetPasswordToken);
  }
}
