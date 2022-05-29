import { AppService } from './app.service';
import { Query, Resolver } from '@nestjs/graphql';
import { App } from './app.entity';

@Resolver()
export class AppResolver {
  constructor(private readonly appService: AppService) {}

  @Query(() => App, { name: 'server' })
  getServerInfo() {
    return this.appService.getServerInfo();
  }
}
