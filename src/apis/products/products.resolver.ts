import { Resolver } from '@nestjs/graphql';
import { Args, Mutation, Query } from '@nestjs/graphql';

import { AuthUser } from '@auth/auth-user.decorator';
import { Roles } from '@auth/roles.decorator';
import { User } from '@apis/users/entities/user.entity';
import {
  CreateProductInput,
  CreateProductOutput,
} from '@apis/products/dtos/create-product.dto';
import {
  DeleteProductInput,
  DeleteProductOutput,
} from '@apis/products/dtos/delete-product.dto';
import {
  EditProductInput,
  EditProductOutput,
} from '@apis/products/dtos/edit-product.dto';
import {
  FindProductByIdInput,
  FindProductByIdOutput,
} from '@apis/products/dtos/find-product-by-id.dto';

import { ProductsService } from '@apis/products/products.service';
import {
  GetProductsBySearchTermInput,
  GetProductsBySearchTermOutput,
} from '@apis/products/dtos/get-products-by-name.dto';

@Resolver()
export class ProductsResolver {
  constructor(private readonly productService: ProductsService) {}

  @Query((returns) => GetProductsBySearchTermOutput)
  @Roles(['Any'])
  async getProductsBySearchTerm(
    @Args('input') getAllProductsInput: GetProductsBySearchTermInput,
  ): Promise<GetProductsBySearchTermOutput> {
    return this.productService.getProductsBySearchTerm(getAllProductsInput);
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
