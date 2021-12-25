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

import { Roles } from '@auth/roles.decorator';
import { SortState } from '@apis/common/common';
import { CategoriesService } from './categories.service';
import {
  CreateCategoryInput,
  CreateCategoryOutput,
} from '@apis/categories/dtos/create-category.dto';
import { DeleteCategoryOutput } from '@apis/categories/dtos/delete-category.dto';
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
import { ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('Category')
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

  @ApiParam({
    name: 'url param categoryId',
    required: true,
    description: 'Category ID',
  })
  @ApiQuery({
    name: 'sort',
    required: true,
    description: 'Sort',
  })
  @ApiQuery({
    name: 'page',
    required: true,
    description: 'Page',
  })
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
