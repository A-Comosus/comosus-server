import { Logger } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';

import { CategoryService } from './category.service';
import { Category } from './entities';
import { CreateCategoryInput, UpdateCategoryInput } from './dto';

@Resolver(() => Category)
export class CategoryResolver {
  private readonly logger = new Logger(CategoryResolver.name);
  constructor(private readonly categoryService: CategoryService) {}

  @Mutation(() => Boolean)
  createCategory(@Args('data') createCategoryInput: CreateCategoryInput) {
    this.logger.log(
      `Receiving request to create new category of ${createCategoryInput.type}...`,
    );
    return this.categoryService.create(createCategoryInput);
  }

  @Query(() => [Category], { name: 'categories' })
  findAll() {
    this.logger.log(`Receiving request to return all categories...`);
    return this.categoryService.findAll();
  }

  @Query(() => Category, { name: 'category' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.categoryService.findOne(id);
  }

}
