import { Module } from '@nestjs/common';
import { AxiosModule, PrismaModule } from '@src/common';

import { LinkService } from './link.service';
import { LinkResolver } from './link.resolver';

@Module({
  imports: [PrismaModule, AxiosModule],
  providers: [LinkResolver, LinkService],
})
export class LinkModule {}
