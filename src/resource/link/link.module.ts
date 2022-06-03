import { Module } from '@nestjs/common';
import { LinkService } from './link.service';
import { LinkResolver } from './link.resolver';

@Module({
  providers: [LinkResolver, LinkService],
})
export class LinkModule {}
