import { Resolver } from '@nestjs/graphql';
import { Args, Mutation, Query } from '@nestjs/graphql';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { Roles } from 'src/auth/roles.decorator';
import { User } from 'src/users/entities/user.entity';
import {
  CreateProductInput,
  CreateProductOutput,
} from './dtos/create-account.dto';
import {
  FindProductByIdInput,
  FindProductByIdOutput,
} from './dtos/find-product';
import {
  GetAllProductsInput,
  GetAllProductsOutput,
} from './dtos/get-all-products';

import { ProductsService } from './products.service';

@Resolver()
export class ProductsResolver {
  constructor(private readonly productService: ProductsService) {}

  @Mutation((returns) => CreateProductOutput)
  @Roles(['Provider'])
  async createProduct(
    @Args('input') createProductInput: CreateProductInput,
    @AuthUser() provider: User,
  ): Promise<CreateProductOutput> {
    return this.productService.createProduct(createProductInput, provider);
  }

  @Query((returns) => GetAllProductsOutput)
  @Roles(['Any'])
  async getAllProducts(
    @Args('input') getAllProductsInput: GetAllProductsInput,
  ): Promise<GetAllProductsOutput> {
    return this.productService.getAllProducts(getAllProductsInput);
  }

  @Query((returns) => FindProductByIdOutput)
  @Roles(['Any'])
  async findProductById(
    @Args('input') findProductInput: FindProductByIdInput,
  ): Promise<FindProductByIdOutput> {
    return this.productService.findProductById(findProductInput);
  }
}
