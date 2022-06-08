import { AppService } from './app.service';
import { Query, Resolver } from '@nestjs/graphql';
import { App } from './app.entity';
import { Logger } from '@nestjs/common';

@Resolver()
export class AppResolver {
  private readonly logger = new Logger(AppResolver.name);
  constructor(private readonly appService: AppService) {}

  @Query(() => App, { name: 'server' })
  getServerInfo() {
    this.logger.log('Receiving request for server info...');
    return this.appService.getServerInfo();
  }
}
