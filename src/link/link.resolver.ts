import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { LinkService } from './link.service';
import { Link } from './entities/link.entity';
import { CreateLinkInput, UpdateLinkInput } from './dto';

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
  updateLink(@Args('updateLinkInput') updateLinkInput: UpdateLinkInput) {
    return this.linkService.update(updateLinkInput.id, updateLinkInput);
  }

  @Mutation(() => Link)
  removeLink(@Args('id', { type: () => Int }) id: number) {
    return this.linkService.remove(id);
  }
}
