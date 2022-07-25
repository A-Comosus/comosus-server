import { Logger, UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';

import { AuthService } from './auth.service';
import { GqlAuthGuard } from './guards';
import {
  RegisterResponse,
  LoginDetailInput,
  LoginResponse,
  RegisterDetailInput,
  ForgetPasswordInput,
  ResetPasswordInput,
  VerifyEmailInput,
} from './dto';

@Resolver()
export class AuthResolver {
  private readonly logger = new Logger(AuthResolver.name);
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => LoginResponse)
  @UseGuards(GqlAuthGuard)
  login(@Args('detail') _loginDetail: LoginDetailInput, @Context() _context) {
    this.logger.log(
      `Finishing request to login with ${_loginDetail.username}...`,
    );
    return this.authService.login(_context.user);
  }

  @Mutation(() => RegisterResponse)
  register(@Args('detail') _registerDetail: RegisterDetailInput) {
    this.logger.log(
      `Receiving request to register with email ${_registerDetail.email}...`,
    );
    return this.authService.register(_registerDetail);
  }

  @Mutation(() => Boolean)
  verifyUserEmail(@Args('detail') verifyEmailInput: VerifyEmailInput) {
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
