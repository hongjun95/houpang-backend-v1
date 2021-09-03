import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';

import {
  CreateProductInput,
  CreateProductOutput,
} from './dtos/create-account.dto';
import { Product } from './entities/product';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly products: Repository<Product>,
  ) {}

  async createProduct(
    createProductInput: CreateProductInput,
    provider: User,
  ): Promise<CreateProductOutput> {
    try {
      console.log(createProductInput);
      const product = await this.products.findOne({
        name: createProductInput.name,
        provider,
      });

      if (product) {
        return {
          ok: false,
          error: '이미 해당 상품을 추가하셨습니다.',
        };
      }

      await this.products.save(this.products.create(createProductInput));

      return {
        ok: true,
      };
    } catch (error) {
      console.error(error);
      return {
        ok: false,
        error: '상품을 추가할 수 없습니다.',
      };
    }
  }
}
