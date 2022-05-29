import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from './guards';
import { LoginDetailInput, LoginResponse, RegisterDetailInput } from './dto';
import { User } from '@src/resource/user/entities/user.entity';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => LoginResponse)
  @UseGuards(GqlAuthGuard)
  login(@Args('detail') _loginDetail: LoginDetailInput, @Context() _context) {
    return this.authService.login(_context.user);
  }

  @Mutation(() => User)
  register(@Args('detail') _registerDetail: RegisterDetailInput) {
    return this.authService.register(_registerDetail);
  }
}
