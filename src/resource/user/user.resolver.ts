import { Resolver, Query, Args, Mutation, Context } from '@nestjs/graphql';
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
  VerifyAccountSendEmailInput,
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
  @UseGuards(JwtAuthGuard)
  updateProfile(@Args('data') data: UpdateProfileInput) {
    this.logger.log(
      `Receiving request to update profile of user with id ${data.id}...`,
    );
    return this.userService.updateProfile(data);
  }

  @Mutation(() => Boolean)
  @UseGuards(JwtAuthGuard)
  verifyAccountSendEmail(@Args('id') id: VerifyAccountSendEmailInput) {
    this.logger.log(
      `Receiving request to send user an email to verify their account with id ${id}...`,
    );
    return this.userService.verifyAccountSendEmail(id);
  }

  @Mutation(() => Boolean)
  @UseGuards(JwtAuthGuard)
  deleteAccount(@Args('id') id: string) {
    this.logger.log(
      `Receiving request to send user an email to verify their account with id ${id}...`,
    );
    return this.userService.deleteAccount(id);
  }

  @Mutation(() => User)
  @UseGuards(JwtAuthGuard)
  updateAvatarUrl(@Args('url') url: string, @Context() context) {
    this.logger.log(
      `Receiving request to send user an email to verify their account with id ${context.req.user.userId}...`,
    );
    return this.userService.updateAvatar(url, context.req.user.userId);
  }
}
