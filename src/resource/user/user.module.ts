import { Module } from '@nestjs/common';
import { PrismaModule } from '@common';

import { UserService } from './user.service';
import { UserResolver } from './user.resolver';

@Module({
  imports: [PrismaModule],
  providers: [UserResolver, UserService],
  exports: [UserService],
})
export class UserModule {}
