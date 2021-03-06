import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  getRequest(_context: ExecutionContext) {
    const context = GqlExecutionContext.create(_context);
    return context.getContext().req;
  }
}
