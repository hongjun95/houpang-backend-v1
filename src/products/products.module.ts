import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryRepository } from 'src/categories/repositories/category.repository';
import { Product } from './entities/product';
import { ProductsResolver } from './products.resolver';
import { ProductsService } from './products.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product, CategoryRepository])],
  providers: [ProductsResolver, ProductsService],
})
export class ProductsModule {}
