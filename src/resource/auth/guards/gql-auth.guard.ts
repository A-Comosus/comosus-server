import { ExecutionContext, Injectable, Logger } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class GqlAuthGuard extends AuthGuard('local') {
  private readonly logger = new Logger(GqlAuthGuard.name);
  constructor() {
    super();
  }

  /**
   * This is GraphQL specific setup with passport
   * GraphQL uses context instead of (request, response) as REST api does
   * For passport to work with GraphQL, we will need to map the request from GraphQL context
   * Passport AuthGuard will then look for the request we mapped
   */

  getRequest(_context: ExecutionContext) {
    this.logger.log(
      `${GqlAuthGuard.name} is starting to validate authentication...`,
    );
    const context = GqlExecutionContext.create(_context);
    const request = context.getContext();
    request.body = context.getArgs().detail;
    return request;
  }
}
