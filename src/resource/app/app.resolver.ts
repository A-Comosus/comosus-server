import { Logger } from '@nestjs/common';
import { Query, Resolver, Args, Mutation } from '@nestjs/graphql';

import { App } from './app.entity';
import { AppService } from './app.service';
import { ContactFormInput } from './dto';

@Resolver()
export class AppResolver {
  private readonly logger = new Logger(AppResolver.name);
  constructor(private readonly appService: AppService) {}

  @Query(() => App, { name: 'server' })
  getServerInfo() {
    this.logger.log('Receiving request for server info...');
    return this.appService.getServerInfo();
  }

  @Mutation(() => Boolean)
  contactForm(@Args('detail') _contactForm: ContactFormInput) {
    this.logger.log(
      `Receiving request to contact us with email ${_contactForm.email}...`,
    );
    return this.appService.contactForm(_contactForm);
  }
}
