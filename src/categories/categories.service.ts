import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import {
  CreateCategoryInput,
  CreateCategoryOutput,
} from './dtos/create-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categories: Repository<Category>,
  ) {}

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
        this.categories.create({ name, coverImg, slug: categorySlug }),
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
}
