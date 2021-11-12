import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { Roles } from '@auth/roles.decorator';
import { CategoriesService } from '@apis/categories/categories.service';
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
  GetProductsOnCategoryInput,
  GetProductsOnCategoryOutput,
} from '@apis/categories/dtos/get-products-on-category.dto';

@Resolver()
export class CategoriesResolver {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Query((returns) => GetAllCategoriesOutput)
  @Roles(['Any'])
  async getAllCategories(): Promise<GetAllCategoriesOutput> {
    return this.categoriesService.getAllCategories();
  }

  @Query((returns) => GetProductsOnCategoryOutput)
  @Roles(['Any'])
  async getProductsOnCategory(
    @Args('input') getProductsOnCategoryInput: GetProductsOnCategoryInput,
  ): Promise<GetProductsOnCategoryOutput> {
    return this.categoriesService.getProductsOnCategory(
      getProductsOnCategoryInput,
    );
  }

  @Mutation((returns) => CreateCategoryOutput)
  @Roles(['Admin'])
  async createCategory(
    @Args('input') createCategoryInput: CreateCategoryInput,
  ): Promise<CreateCategoryOutput> {
    return this.categoriesService.createCategory(createCategoryInput);
  }

  @Mutation((returns) => EditCategoryOutput)
  @Roles(['Admin'])
  async editCategory(
    @Args('input') editCategoryInput: EditCategoryInput,
  ): Promise<EditCategoryOutput> {
    return this.categoriesService.editCategory(editCategoryInput);
  }

  @Mutation((returns) => EditCategoryOutput)
  @Roles(['Admin'])
  async deleteCategory(
    @Args('input') deleteCategoryInput: DeleteCategoryInput,
  ): Promise<DeleteCategoryOutput> {
    return this.categoriesService.deleteCategory(deleteCategoryInput);
  }
}
