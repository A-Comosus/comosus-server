import { Logger } from '@nestjs/common';
import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';

import { LinkService } from './link.service';
import { Link } from './entities/link.entity';
import {
  CreateLinkInput,
  CreateLinkResponse,
  FindLinksOfUserByUserIdResponse,
  FindLinksOfUserByUserIdInput,
  UpdateLinkInput,
  UpdateLinkResponse,
  ReorderLinksOfUserInput,
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

  @Query(() => [FindLinksOfUserByUserIdResponse])
  async findLinksOfUserByUserId(
    @Args('data') { userId }: FindLinksOfUserByUserIdInput,
  ) {
    this.logger.log(
      `Receiving request to find links belongs to user ${userId}...`,
    );
    return this.linkService.findLinksOfUserByUserId(userId);
  }

  @Mutation(() => UpdateLinkResponse)
  updateLink(@Args('data') updateLinkInput: UpdateLinkInput) {
    this.logger.log(
      `Receiving request to update title of link ${updateLinkInput.id}...`,
    );
    return this.linkService.update(updateLinkInput);
  }

  @Mutation(() => [FindLinksOfUserByUserIdResponse])
  reorderLinksOfUser(@Args('data') data: ReorderLinksOfUserInput) {
    this.logger.log(
      `Receiving request to reorder links of user with id ${data.userId}`,
    );
    return this.linkService.reorderLinksOfUser(data);
  }

  @Mutation(() => Boolean, { name: 'deleteLinkById' })
  deleteLink(@Args('data') { id }: DeleteLinkInput) {
    this.logger.log(`Receiving request to delete link ${id}...`);
    return this.linkService.deleteById(id);
  }
}
