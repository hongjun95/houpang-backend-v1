import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';

import {
  CreateProductInput,
  CreateProductOutput,
} from './dtos/create-product.dto';
import { EditProductInput, EditProductOutput } from './dtos/edit-product.dts';
import {
  DeleteProductInput,
  DeleteProductOutput,
} from './dtos/edit-product.dts copy';
import {
  FindProductByIdInput,
  FindProductByIdOutput,
} from './dtos/find-product';
import {
  GetAllProductsInput,
  GetAllProductsOutput,
} from './dtos/get-all-products';
import { Product } from './entities/product';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly products: Repository<Product>,
  ) {}

  async getAllProducts({
    page,
  }: GetAllProductsInput): Promise<GetAllProductsOutput> {
    // todo
    // category 내역에 있는 품목만 가져오는 것으로 만들기
    try {
      const takePages = 10;
      const [products, totalProducts] = await this.products.findAndCount({
        skip: (page - 1) * takePages,
        take: takePages,
        order: {
          createdAt: 'DESC',
        },
        relations: ['provider'],
      });
      return {
        ok: true,
        products,
        totalPages: Math.ceil(totalProducts / takePages),
        totalResults: totalProducts,
      };
    } catch (error) {
      console.error(error);
      return {
        ok: false,
        error: '상품 품목들을 가져올 수 없습니다.',
      };
    }
  }

  async findProductById({
    productId,
  }: FindProductByIdInput): Promise<FindProductByIdOutput> {
    // todo
    // category 내역에 있는 품목만 가져오는 것으로 만들기
    try {
      const product = await this.products.findOne(productId, {
        relations: ['provider'],
      });

      return {
        ok: true,
        product,
      };
    } catch (error) {
      console.error(error);
      return {
        ok: false,
        error: '상품 품목들을 가져올 수 없습니다.',
      };
    }
  }

  async createProduct(
    createProductInput: CreateProductInput,
    provider: User,
  ): Promise<CreateProductOutput> {
    try {
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

      await this.products.save(
        this.products.create({ ...createProductInput, provider }),
      );

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

  async editProduct(
    editProductInput: EditProductInput,
    provider: User,
  ): Promise<EditProductOutput> {
    try {
      const product = await this.products.findOne({
        id: editProductInput.id,
        provider,
      });

      if (!product) {
        return {
          ok: false,
          error: '수정하시려는 상품이 없습니다.',
        };
      }

      await this.products.save({
        ...editProductInput,
      });

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

  async deleteProduct(
    { productId }: DeleteProductInput,
    provider: User,
  ): Promise<DeleteProductOutput> {
    try {
      const product = await this.products.findOne({
        id: productId,
        provider,
      });

      if (!product) {
        return {
          ok: false,
          error: '삭제하시려는 상품을 찾을 수가 없습니다.',
        };
      }

      await this.products.delete(productId);

      return {
        ok: true,
      };
    } catch (error) {
      console.error(error);
      return {
        ok: false,
        error: '상품을 삭제할 수가 없습니다.',
      };
    }
  }
}
