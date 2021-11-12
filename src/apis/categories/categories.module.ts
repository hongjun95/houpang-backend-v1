import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Product } from '@apis/products/entities/product.entity';
import { CategoriesResolver } from '@apis/categories/categories.resolver';
import { CategoriesService } from '@apis/categories/categories.service';
import { Category } from '@apis/categories/entities/category.entity';
import { CategoriesController } from '@apis/categories/categories.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Category, Product])],
  providers: [CategoriesResolver, CategoriesService],
  controllers: [CategoriesController],
})
export class CategoriesModule {}
