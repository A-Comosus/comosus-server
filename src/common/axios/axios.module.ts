import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';

import { AxiosService } from './axios.service';

@Module({
  imports: [ConfigModule, HttpModule],
  providers: [AxiosService],
  exports: [AxiosService],
})
export class AxiosModule {}
