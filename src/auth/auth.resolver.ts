import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from './guards';
import { LoginResponse, LoginUserInput } from './dto';
import { User } from '@src/user/entities/user.entity';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => LoginResponse)
  @UseGuards(GqlAuthGuard)
  login(
    @Args('loginUserInput') loginUserInput: LoginUserInput,
    @Context() context,
  ) {
    return this.authService.login(context.user);
  }

  @Mutation(() => User)
  register(@Args('loginUserInput') loginUserInput: LoginUserInput) {
    return this.authService.register(loginUserInput);
  }
}
