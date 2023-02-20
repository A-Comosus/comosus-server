import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { join } from 'path';

import { MailingService, PrismaService, CustomLoggerService } from '@common';
import { UserModule, AuthModule, LinkModule, CategoryModule } from '@resource';
import { AppResolver } from './app.resolver';
import { AppService } from './app.service';
import { AxiosModule } from '@src/common';

const schemaFilePath =
  process.env.LAMBDA_TASK_ROOT && process.env.AWS_EXECUTION_ENV
    ? '/tmp/schema.gql'
    : join(process.cwd(), 'src/schema/schema.gql');

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: false, // Set ConfigModule to be accessible in other modules
      envFilePath: ['.env', '.env.development', '.env.development.local'],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: schemaFilePath,
      sortSchema: true,
      introspection: true,
    }),
    UserModule,
    AuthModule,
    LinkModule,
    CategoryModule,
    AxiosModule,
  ],
  providers: [
    AppResolver,
    AppService,
    PrismaService,
    MailingService,
    CustomLoggerService,
  ],
})
export class AppModule {}
