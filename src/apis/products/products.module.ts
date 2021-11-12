import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CategoryRepository } from '@apis/categories/repositories/category.repository';
import { Product } from '@apis/products/entities/product.entity';
import { ProductsController } from '@apis/products/products.controller';
import { ProductsResolver } from '@apis/products/products.resolver';
import { ProductsService } from '@apis/products/products.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product, CategoryRepository])],
  providers: [ProductsResolver, ProductsService],
  controllers: [ProductsController],
})
export class ProductsModule {}
