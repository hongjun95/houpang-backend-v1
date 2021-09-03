import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Roles } from 'src/auth/roles.decorator';
import { CategoriesService } from './categories.service';
import {
  CreateCategoryInput,
  CreateCategoryOutput,
} from './dtos/create-category.dto';
import { GetAllCategoriesOutput } from './dtos/get-all-categories.dto';

@Resolver()
export class CategoriesResolver {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Query((returns) => GetAllCategoriesOutput)
  @Roles(['Any'])
  async getAllCategories(): Promise<GetAllCategoriesOutput> {
    return this.categoriesService.getAllCategories();
  }

  @Mutation((returns) => CreateCategoryOutput)
  @Roles(['Admin'])
  async createCategory(
    @Args('input') createCategoryInput: CreateCategoryInput,
  ): Promise<CreateCategoryOutput> {
    return this.categoriesService.createCategory(createCategoryInput);
  }
}
