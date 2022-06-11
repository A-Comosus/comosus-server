import { Logger } from '@nestjs/common';
import { Resolver, Mutation, Args } from '@nestjs/graphql';

import { LinkService } from './link.service';
import { Link } from './entities/link.entity';
import {
  CreateLinkInput,
  CreateLinkResponse,
  UpdateLinkInput,
  UpdateLinkResponse,
  DeleteLinkInput,
} from './dto';

@Resolver(() => Link)
export class LinkResolver {
  private readonly logger = new Logger(LinkResolver.name);
  constructor(private readonly linkService: LinkService) {}

  @Mutation(() => CreateLinkResponse)
  async createLink(@Args('data') _createLinkInput: CreateLinkInput) {
    return await this.linkService.create(_createLinkInput);
  }

  @Mutation(() => UpdateLinkResponse)
  updateLink(@Args('data') updateLinkInput: UpdateLinkInput) {
    this.logger.log(
      `Receiving request to update title of link ${updateLinkInput.id}`,
    );
    return this.linkService.update(updateLinkInput);
  }

  @Mutation(() => Boolean, { name: 'deleteLinkById' })
  deleteLink(@Args('data') { id }: DeleteLinkInput) {
    this.logger.log(`Receiving request to delete link ${id}`);
    return this.linkService.deleteById(id);
  }
}
