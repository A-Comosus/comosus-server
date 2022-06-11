import { Logger, UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';

import { JwtAuthGuard } from '@resource/auth/guards';
import { App } from './app.entity';
import { AppService } from './app.service';

@Resolver()
export class AppResolver {
  private readonly logger = new Logger(AppResolver.name);
  constructor(private readonly appService: AppService) {}

  @Query(() => App, { name: 'server' })
  @UseGuards(JwtAuthGuard)
  getServerInfo() {
    this.logger.log('Receiving request for server info...');
    return this.appService.getServerInfo();
  }
}
