import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PrismaModule } from '@common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';

@Module({
  imports: [PrismaModule, ConfigModule],
  providers: [UserResolver, UserService],
  exports: [UserService],
})
export class UserModule {}
