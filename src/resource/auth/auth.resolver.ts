import { Logger, UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';

import { AuthService } from './auth.service';
import { GqlAuthGuard } from './guards';
import {
  RegisterInput,
  RegisterResult,
  LoginInput,
  LoginResult,
  ForgetPasswordInput,
  ResetPasswordInput,
  VerifyEmailInput,
} from './dto';

@Resolver()
export class AuthResolver {
  private readonly logger = new Logger(AuthResolver.name);
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => LoginResult)
  @UseGuards(GqlAuthGuard)
  login(@Args('detail') detail: LoginInput, @Context() context) {
    if (context.user.code) return context.user;

    this.logger.log(`Finishing request to login with ${detail.username}...`);
    return this.authService.login(context.user);
  }

  @Mutation(() => RegisterResult)
  register(@Args('detail') detail: RegisterInput) {
    this.logger.log(`Receiving request to register user ${detail.email}...`);
    return this.authService.register(detail);
  }

  @Mutation(() => Boolean)
  verifyUserEmail(@Args('detail') verifyEmailInput: VerifyEmailInput) {
    this.logger.log(
      `Receiving request to verify user email with id: ${verifyEmailInput.id} ...`,
    );
    return this.authService.verifyUserEmail(verifyEmailInput);
  }

  @Mutation(() => Boolean)
  forgetPasswordSendEmail(
    @Args('detail') _forgetPasswordInput: ForgetPasswordInput,
  ) {
    this.logger.log(
      `Receiving request to send password reset email to ${_forgetPasswordInput.email}`,
    );
    return this.authService.forgetPasswordSendEmail(_forgetPasswordInput);
  }

  @Mutation(() => Boolean)
  resetPassword(@Args('detail') resetPasswordInput: ResetPasswordInput) {
    this.logger.log(`Receiving request to reset password`);
    return this.authService.resetPassword(resetPasswordInput);
  }
}
