import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from './guards';
import { LoginResponse, UserDetailInput } from './dto';
import { User } from '@src/user/entities/user.entity';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => LoginResponse)
  @UseGuards(GqlAuthGuard)
  login(@Args('userDetail') _useDetail: UserDetailInput, @Context() _context) {
    return this.authService.login(_context.user);
  }

  @Mutation(() => User)
  register(@Args('userDetail') _useDetail: UserDetailInput) {
    return this.authService.register(_useDetail);
  }
}
