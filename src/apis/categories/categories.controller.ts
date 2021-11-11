import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { Roles } from 'src/auth/roles.decorator';
import { SortState } from '../common/common';
import { CategoriesService } from './categories.service';
import {
  CreateCategoryInput,
  CreateCategoryOutput,
} from './dtos/create-category.dto';
import { DeleteCategoryOutput } from './dtos/delete-category.dto';
import {
  EditCategoryInput,
  EditCategoryOutput,
} from './dtos/edit-category.dto';
import { GetAllCategoriesOutput } from './dtos/get-all-categories.dto';
import {
  GetProductsByCategoryIdInput,
  GetProductsByCategoryIdOutput,
} from './dtos/get-products-by-categoryId.dto';
import {
  GetProductsOnCategoryInput,
  GetProductsOnCategoryOutput,
} from './dtos/get-products-on-category.dto';

@Controller('/categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get('')
  @Roles(['Any'])
  async getAllCategories(): Promise<GetAllCategoriesOutput> {
    return this.categoriesService.getAllCategories();
  }

  @Get('/products/:slug')
  @Roles(['Any'])
  async getProductsOnCategory(
    @Param() getProductsOnCategoryInput: GetProductsOnCategoryInput,
  ): Promise<GetProductsOnCategoryOutput> {
    return this.categoriesService.getProductsOnCategory(
      getProductsOnCategoryInput,
    );
  }

  @Get('/:categoryId')
  @Roles(['Any'])
  async getProductsByCategoryId(
    @Param('categoryId') categoryId: string,
    @Query('sort') sort: SortState,
    @Query('page') page: string,
  ): Promise<GetProductsByCategoryIdOutput> {
    const getProductsByCategoryIdInput: GetProductsByCategoryIdInput = {
      categoryId,
      sort,
      page: +page,
    };
    return this.categoriesService.getProductsByCategoryId(
      getProductsByCategoryIdInput,
    );
  }

  @Post('')
  @Roles(['Admin'])
  async createCategory(
    @Body() createCategoryInput: CreateCategoryInput,
  ): Promise<CreateCategoryOutput> {
    return this.categoriesService.createCategory(createCategoryInput);
  }

  @Put('/:categoryId')
  @Roles(['Admin'])
  async editCategory(
    @Body() body,
    @Param('categoryId') categoryId,
  ): Promise<EditCategoryOutput> {
    const editCategoryInput: EditCategoryInput = {
      ...body,
      categoryId,
    };
    return this.categoriesService.editCategory(editCategoryInput);
  }

  @Delete('/:categoryId')
  @Roles(['Admin'])
  async deleteCategory(
    @Param('categoryId') categoryId,
  ): Promise<DeleteCategoryOutput> {
    return this.categoriesService.deleteCategory({ categoryId });
  }
}
