import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Product } from '@apis/products/entities/product.entity';
import {
  CreateCategoryInput,
  CreateCategoryOutput,
} from '@apis/categories/dtos/create-category.dto';
import {
  DeleteCategoryInput,
  DeleteCategoryOutput,
} from '@apis/categories/dtos/delete-category.dto';
import {
  EditCategoryInput,
  EditCategoryOutput,
} from '@apis/categories/dtos/edit-category.dto';
import { GetAllCategoriesOutput } from '@apis/categories/dtos/get-all-categories.dto';
import {
  GetProductsByCategoryIdInput,
  GetProductsByCategoryIdOutput,
} from '@apis/categories/dtos/get-products-by-categoryId.dto';
import {
  GetProductsOnCategoryInput,
  GetProductsOnCategoryOutput,
} from '@apis/categories/dtos/get-products-on-category.dto';
import { createPaginationObj } from '@apis/common/dtos/pagination.dto';
import { CategoryRepository } from '@apis/categories/repositories/category.repository';

@Injectable()
export class CategoriesService {
  constructor(
    private readonly categories: CategoryRepository,

    @InjectRepository(Product)
    private readonly products: Repository<Product>,
  ) {}

  async getAllCategories(): Promise<GetAllCategoriesOutput> {
    try {
      const categories = await this.categories.find();
      if (!categories) {
        return {
          ok: false,
          error: '카테고리를 불러올 수가 없습니다.',
        };
      }
      return {
        ok: true,
        categories,
      };
    } catch (error) {
      console.error(error);
      return {
        ok: false,
        error: '카테고리를 불러올 수가 없습니다.',
      };
    }
  }

  async getProductsOnCategory({
    slug,
    page,
  }: GetProductsOnCategoryInput): Promise<GetProductsOnCategoryOutput> {
    try {
      const takePages = 10;
      const category = await this.categories.findOne({ slug });

      if (!category) {
        return {
          ok: false,
          error: '해당 카테고리가 존재하지 않습니다.',
        };
      }

      const [products, totalProducts] = await this.products.findAndCount({
        where: {
          category,
        },
        skip: (page - 1) * takePages,
        take: takePages,
      });

      const paginationObj = createPaginationObj({
        takePages,
        page,
        totalData: totalProducts,
      });

      return {
        ok: true,
        products,
        categoryName: category.name,
        ...paginationObj,
      };
    } catch (error) {
      console.error(error);
      return {
        ok: false,
        error: '카테고리에 있는 상품을 불러올 수 없습니다.',
      };
    }
  }

  async getProductsByCategoryId({
    categoryId,
    page = 1,
    sort = 'createdAt_desc',
  }: GetProductsByCategoryIdInput): Promise<GetProductsByCategoryIdOutput> {
    try {
      const takePages = 10;
      const category = await this.categories.findOne({ id: categoryId });

      if (!category) {
        return {
          ok: false,
          error: '해당 카테고리가 존재하지 않습니다.',
        };
      }

      let order = {};
      switch (sort) {
        case 'createdAt_desc':
          order = {
            createdAt: 'DESC',
          };
          break;
        case 'price_desc':
          order = {
            price: 'DESC',
          };
          break;
        case 'price_asc':
          order = {
            price: 'ASC',
          };
          break;
        default:
          throw new Error('상품이 존재하지 않습니다.');
      }

      const [products, totalProducts] = await this.products.findAndCount({
        where: {
          category,
        },
        relations: ['provider', 'reviews'],
        order,
        skip: (page - 1) * takePages,
        take: takePages,
      });

      const paginationObj = createPaginationObj({
        takePages,
        page,
        totalData: totalProducts,
      });

      return {
        ok: true,
        products,
        categoryName: category.name,
        ...paginationObj,
      };
    } catch (error) {
      console.error(error);
      return {
        ok: false,
        error: '카테고리에 있는 상품을 불러올 수 없습니다.',
      };
    }
  }

  async createCategory({
    name,
    coverImg,
  }: CreateCategoryInput): Promise<CreateCategoryOutput> {
    try {
      const categoryName = name.trim().toLowerCase();
      const categorySlug = categoryName.replace(/ /g, '-');

      const category = await this.categories.findOne({
        slug: categorySlug,
      });

      if (category) {
        return {
          ok: false,
          error: '이미 해당 카테고리를 추가하셨습니다.',
        };
      }

      await this.categories.save(
        this.categories.create({
          name: categoryName,
          coverImg,
          slug: categorySlug,
        }),
      );

      return {
        ok: true,
      };
    } catch (error) {
      console.error(error);
      return {
        ok: false,
        error: '카테고리를 추가할 수 없습니다.',
      };
    }
  }

  async editCategory({
    name,
    coverImg,
    categoryId,
  }: EditCategoryInput): Promise<EditCategoryOutput> {
    try {
      const categoryName = name.trim().toLowerCase();
      const categorySlug = categoryName.replace(/ /g, '-');

      const category = await this.categories.findOne(categoryId);

      if (!category) {
        return {
          ok: false,
          error: '수정할 카테고리를 찾을 수가 없습니다.',
        };
      }

      await this.categories.save({
        id: categoryId,
        name: categoryName,
        coverImg,
        slug: categorySlug,
      });

      return {
        ok: true,
      };
    } catch (error) {
      console.error(error);
      return {
        ok: false,
        error: '카테고리를 수정할 수 없습니다.',
      };
    }
  }

  async deleteCategory({
    categoryId,
  }: DeleteCategoryInput): Promise<DeleteCategoryOutput> {
    try {
      const category = await this.categories.findOne(categoryId);

      if (!category) {
        return {
          ok: false,
          error: '삭제할 카테고리를 찾을 수가 없습니다.',
        };
      }

      await this.categories.delete(categoryId);
      return {
        ok: true,
      };
    } catch (error) {
      console.error(error);
      return {
        ok: false,
        error: '카테고리를 수정할 수 없습니다.',
      };
    }
  }
}
