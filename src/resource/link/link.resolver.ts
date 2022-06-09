import { Logger } from '@nestjs/common';
import { Resolver, Mutation, Args } from '@nestjs/graphql';

import { LinkService } from './link.service';
import { Link } from './entities/link.entity';
import {
  CreateLinkInput,
  CreateLinkResponse,
  DeleteLinkInput,
  UpdateLinkTitleInput,
  UpdateLinkUrlInput,
  UpdateLinkVisibilityInput,
} from './dto';

@Resolver(() => Link)
export class LinkResolver {
  private readonly logger = new Logger(LinkResolver.name);
  constructor(private readonly linkService: LinkService) {}

  @Mutation(() => CreateLinkResponse)
  async createLink(@Args('data') _createLinkInput: CreateLinkInput) {
    return await this.linkService.create(_createLinkInput);
  }

  @Mutation(() => Boolean)
  updateLinkTitle(@Args('data') { id, title }: UpdateLinkTitleInput) {
    this.logger.log(`Receiving request to update title of link ${id}`);
    return this.linkService.update(id, { title });
  }

  @Mutation(() => Boolean)
  updateLinkUrl(@Args('data') { id, url }: UpdateLinkUrlInput) {
    return this.linkService.updateLinkUrl(id, url);
  }

  @Mutation(() => Boolean)
  updateLinkVisibility(
    @Args('data') { id, isVisible }: UpdateLinkVisibilityInput,
  ) {
    this.logger.log(`Toggle visibility of link ${id}`);
    return this.linkService.update(id, { isVisible });
  }

  @Mutation(() => Boolean, { name: 'deleteLinkById' })
  deleteLink(@Args('data') { id }: DeleteLinkInput) {
    this.logger.log(`Receiving request to delete link ${id}`);
    return this.linkService.delete(id);
  }
}
