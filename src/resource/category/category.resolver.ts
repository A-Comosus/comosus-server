import { Logger } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';

import { CategoryService } from './category.service';
import { Category, CategoryWithoutUsers } from './entities';
import { CreateCategoryInput } from './dto';

@Resolver(() => Category)
export class CategoryResolver {
  private readonly logger = new Logger(CategoryResolver.name);
  constructor(private readonly categoryService: CategoryService) {}

  @Mutation(() => CategoryWithoutUsers)
  createCategory(@Args('data') createCategoryInput: CreateCategoryInput) {
    this.logger.log(
      `Receiving request to create new category of ${createCategoryInput.type}...`,
    );
    return this.categoryService.create(createCategoryInput);
  }

  @Query(() => [CategoryWithoutUsers], { name: 'categories' })
  findAll() {
    this.logger.log(`Receiving request to return all categories...`);
    return this.categoryService.findAll();
  }

  @Query(() => Category, { name: 'category' })
  findOne(@Args('id', { type: () => String }) id: string) {
    this.logger.log(`Receiving request to find category by ${id}...`);
    return this.categoryService.findOne(id);
  }
}
