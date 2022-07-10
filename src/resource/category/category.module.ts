import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryResolver } from './category.resolver';
import { PrismaModule } from '@src/common';

@Module({
  imports: [PrismaModule],
  providers: [CategoryResolver, CategoryService],
})
export class CategoryModule {}
