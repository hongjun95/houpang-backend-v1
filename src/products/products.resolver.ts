import { Resolver } from '@nestjs/graphql';
import { Args, Mutation, Query } from '@nestjs/graphql';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { Roles } from 'src/auth/roles.decorator';
import { User } from 'src/users/entities/user.entity';
import {
  CreateProductInput,
  CreateProductOutput,
} from './dtos/create-product.dto';
import {
  DeleteProductInput,
  DeleteProductOutput,
} from './dtos/delete-product.dto';
import { EditProductInput, EditProductOutput } from './dtos/edit-product.dto';
import {
  FindProductByIdInput,
  FindProductByIdOutput,
} from './dtos/find-product-by-id.dto';
import {
  GetAllProductsInput,
  GetAllProductsOutput,
} from './dtos/get-all-products.dto';

import { ProductsService } from './products.service';

@Resolver()
export class ProductsResolver {
  constructor(private readonly productService: ProductsService) {}

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

  @Mutation((returns) => CreateProductOutput)
  @Roles(['Provider', 'Admin'])
  async createProduct(
    @Args('input') createProductInput: CreateProductInput,
    @AuthUser() provider: User,
  ): Promise<CreateProductOutput> {
    return this.productService.createProduct(createProductInput, provider);
  }

  @Mutation((returns) => EditProductOutput)
  @Roles(['Provider', 'Admin'])
  async editProduct(
    @Args('input') editProductInput: EditProductInput,
    @AuthUser() provider: User,
  ): Promise<EditProductOutput> {
    return this.productService.editProduct(editProductInput, provider);
  }

  @Mutation((returns) => DeleteProductOutput)
  @Roles(['Provider', 'Admin'])
  async deleteProduct(
    @Args('input') deleteProductInput: DeleteProductInput,
    @AuthUser() provider: User,
  ): Promise<DeleteProductOutput> {
    return this.productService.deleteProduct(deleteProductInput, provider);
  }
}
