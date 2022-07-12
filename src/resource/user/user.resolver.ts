import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { JwtAuthGuard } from '@src/resource/auth/guards';
import { Logger, UseGuards } from '@nestjs/common';
import {
  FindByIdInput,
  FindUserByUsernameInput,
  FindUserByEmailInput,
  FindUserByUsernameResponse,
  OnboardUserInput,
  UpdateProfileInput,
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

  @Query(() => User, { name: 'findUserById' })
  @UseGuards(JwtAuthGuard)
  findById(@Args('data') { id }: FindByIdInput) {
    this.logger.log(`Receiving request to find user with id ${id}`);
    return this.userService.findById(id);
  }

  @Mutation(() => User)
  @UseGuards(JwtAuthGuard)
  onboardUser(@Args('data') data: OnboardUserInput) {
    this.logger.log(`Receiving request to onboard user of id ${data.id}...`);
    return this.userService.onboardUser(data);
  }

  @Query(() => FindUserByUsernameResponse, { name: 'findUserByUsername' })
  findByUsername(@Args('username') { username }: FindUserByUsernameInput) {
    this.logger.log(
      `Receiving request to find user with username ${username}...`,
    );
    return this.userService.findByUsername(username);
  }

  @Query(() => User, { name: 'userByEmail' })
  @UseGuards(JwtAuthGuard)
  findByEmail(@Args('email') { email }: FindUserByEmailInput) {
    this.logger.log(`Receiving request to find user with email ${email}...`);
    return this.userService.findByEmail(email);
  }

  @Mutation(() => User)
  updateProfile(@Args('data') data: UpdateProfileInput) {
    this.logger.log(
      `Receiving request to update profile of username ${data.username}...`,
    );
    return this.userService.updateProfile(data);
  }
}
