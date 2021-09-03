import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Roles } from 'src/auth/roles.decorator';
import { CategoriesService } from './categories.service';
import {
  CreateCategoryInput,
  CreateCategoryOutput,
} from './dtos/create-category.dto';
import {
  EditCategoryInput,
  EditCategoryOutput,
} from './dtos/edit-category.dto';
import { GetAllCategoriesOutput } from './dtos/get-all-categories.dto';
import {
  GetProductsOnCategoryInput,
  GetProductsOnCategoryOutput,
} from './dtos/get-products-on-category.dto';

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
}
