import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Product } from '@apis/products/entities/product.entity';
import { CategoriesResolver } from '@apis/categories/categories.resolver';
import { CategoriesService } from '@apis/categories/categories.service';
import { CategoriesController } from '@apis/categories/categories.controller';
import { CategoryRepository } from '@apis/categories/repositories/category.repository';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryRepository, Product])],
  providers: [CategoriesResolver, CategoriesService],
  controllers: [CategoriesController],
})
export class CategoriesModule {}
