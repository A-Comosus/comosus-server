import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { LinkService } from './link.service';
import { Link } from './entities/link.entity';
import {
  CreateLinkInput,
  DeleteLinkInput,
} from './dto';

@Resolver(() => Link)
export class LinkResolver {
  constructor(private readonly linkService: LinkService) {}

  @Mutation(() => Link)
  createLink(@Args('data') _createLinkInput: CreateLinkInput) {
    return this.linkService.create(_createLinkInput);
  }

  @Query(() => [Link], { name: 'link' })
  findAll() {
    return this.linkService.findAll();
  }

  @Query(() => Link, { name: 'link' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.linkService.findOne(id);
  }

  @Mutation(() => Link)
  updateLink(@Args('data') _updateLinkInput: UpdateLinkInput) {
    return this.linkService.update(_updateLinkInput.id, _updateLinkInput);
  }

  @Mutation(() => Boolean, { name: 'deleteLinkById' })
  deleteLink(@Args('data') { id }: DeleteLinkInput) {
    this.logger.log(`Receiving request to delete link ${id}`);
    return this.linkService.delete(id);
  }
}
