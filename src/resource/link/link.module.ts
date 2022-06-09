import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '@src/common';
import { HttpModule } from '@nestjs/axios';

import { LinkService } from './link.service';
import { LinkResolver } from './link.resolver';

@Module({
  imports: [ConfigModule, PrismaModule, HttpModule],
  providers: [LinkResolver, LinkService],
})
export class LinkModule {}
