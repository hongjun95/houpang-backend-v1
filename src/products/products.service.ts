import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';

import {
  CreateProductInput,
  CreateProductOutput,
} from './dtos/create-product.dto';
import { EditProductInput, EditProductOutput } from './dtos/edit-product.dto';
import {
  DeleteProductInput,
  DeleteProductOutput,
} from './dtos/delete-product.dto';
import {
  FindProductByIdInput,
  FindProductByIdOutput,
} from './dtos/find-product-by-id.dto';
import {
  GetAllProductsInput,
  GetAllProductsOutput,
} from './dtos/get-all-products.dto';
import { Product } from './entities/product';
import { CategoryRepository } from 'src/categories/repositories/category.repository';
import {
  GetProductsFromProviderInput,
  GetProductsFromProviderOutput,
} from './dtos/get-products-from-provider.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly products: Repository<Product>,

    private readonly categories: CategoryRepository,
  ) {}

  // Deprecated
  async getAllProducts({
    page,
  }: GetAllProductsInput): Promise<GetAllProductsOutput> {
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
        relations: ['provider','category'],
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

  async getProductsFromProvider(
    { page = 1, sort }: GetProductsFromProviderInput,
    provider: User,
  ): Promise<GetProductsFromProviderOutput> {
    let products: Product[], totalProducts: number;
    const takePages = 10;
    try {
      switch (sort) {
        case 'createdAt desc':
          [products, totalProducts] = await this.products.findAndCount({
            where: {
              provider,
            },
            relations: ['provider'],
            order: {
              createdAt: 'DESC',
            },
            skip: (page - 1) * takePages,
            take: takePages,
          });
          break;
        case 'price desc':
          [products, totalProducts] = await this.products.findAndCount({
            where: {
              provider,
            },
            relations: ['provider'],
            order: {
              price: 'DESC',
            },
            skip: (page - 1) * takePages,
            take: takePages,
          });
          break;
        case 'price asc':
          [products, totalProducts] = await this.products.findAndCount({
            where: {
              provider,
            },
            relations: ['provider'],
            order: {
              price: 'ASC',
            },
            skip: (page - 1) * takePages,
            take: takePages,
          });
          break;
        default:
          throw new Error('상품이 존재하지 않습니다.');
      }

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

      const category = await this.categories.findOneBySlugUsingName(
        createProductInput.categoryName,
      );

      const newProduct = await this.products.save(
        this.products.create({ ...createProductInput, provider, category }),
      );

      return {
        ok: true,
        product: newProduct,
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
        id: editProductInput.productId,
        provider,
      });

      let category = product.category;

      if (!product) {
        return {
          ok: false,
          error: '수정하시려는 상품이 없습니다.',
        };
      }

      if (editProductInput.categoryName) {
        category = await this.categories.findOneBySlugUsingName(
          editProductInput.categoryName,
        );
      }

      await this.products.save({
        id: editProductInput.productId,
        ...editProductInput,
        category,
      });

      return {
        ok: true,
      };
    } catch (error) {
      console.error(error);
      return {
        ok: false,
        error: '상품을 수정할 수 없습니다.',
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
