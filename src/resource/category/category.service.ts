import { Injectable, Logger } from '@nestjs/common';

import { PrismaService } from '@src/common';
import { CreateCategoryInput } from './dto';

@Injectable()
export class CategoryService {
  private readonly logger = new Logger(CategoryService.name);

  constructor(private readonly prismaService: PrismaService) {}

  async create({ type }: CreateCategoryInput) {
    this.logger.log(`Created new category of ${type}`);
    return await this.prismaService.category.create({
      data: {
        type,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    });
  }

  async findAll() {
    this.logger.log('Returned all categories in data base');
    return await this.prismaService.category.findMany();
  }

  async findOne(id: string) {
    this.logger.log(`Returning category of ${id}`);
    return await this.prismaService.category.findUnique({
      where: { id },
      include: { users: true },
    });
  }
}
