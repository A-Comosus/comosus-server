import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MailingService } from './mailing.service';

@Module({
  imports: [ConfigModule],
  providers: [MailingService],
  exports: [MailingService],
})
export class MailingModule {}
