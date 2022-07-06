import { Injectable, Logger } from '@nestjs/common';

import { PrismaService } from '@src/common';
import { CreateCategoryInput, UpdateCategoryInput } from './dto';

@Injectable()
export class CategoryService {
  private readonly logger = new Logger(CategoryService.name);

  constructor(private readonly prismaService: PrismaService) {}

  async create({ type }: CreateCategoryInput) {
    await this.prismaService.category.create({
      data: {
        type,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    });
    this.logger.log(`Created new category of ${type}`);
    return true;
  }

  async findAll() {
    return await this.prismaService.category.findMany();
  }

  async findOne(id: string) {
    return await this.prismaService.category.findUnique({
      where: { id },
    });
  }

}
