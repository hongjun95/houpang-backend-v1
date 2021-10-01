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
import { AuthUser } from 'src/auth/auth-user.decorator';
import { Roles } from 'src/auth/roles.decorator';
import { User } from 'src/apis/users/entities/user.entity';
import {
  CreateProductInput,
  CreateProductOutput,
} from './dtos/create-product.dto';
import { DeleteProductOutput } from './dtos/delete-product.dto';
import { EditProductInput, EditProductOutput } from './dtos/edit-product.dto';
import { FindProductByIdOutput } from './dtos/find-product-by-id.dto';
import {
  GetProductsFromProviderInput,
  GetProductsFromProviderOutput,
  GetProductsFromProviderQuery,
} from './dtos/get-products-from-provider.dto';
import { ProductsService } from './products.service';
import {
  GetProductsBySearchTermInput,
  GetProductsBySearchTermOutput,
} from './dtos/get-products-by-name.dto';
import { SortState } from '../categories/dtos/get-products-by-categoryId.dto';

@Controller('/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('/')
  @Roles(['Any'])
  async getProductsBySearchTerm(
    @Query('page') page, //
    @Query('query') query,
    @Query('sort') sort: SortState,
  ): Promise<GetProductsBySearchTermOutput> {
    const getProductsBySearchTermInput: GetProductsBySearchTermInput = {
      page,
      query,
      sort,
    };
    return this.productsService.getProductsBySearchTerm(
      getProductsBySearchTermInput,
    );
  }

  @Get('/provider')
  @Roles(['Provider'])
  async getProductsFromProvider(
    @Query() query: GetProductsFromProviderQuery,
    @AuthUser() provider: User,
  ): Promise<GetProductsFromProviderOutput> {
    const getProductsFromProviderInput: GetProductsFromProviderInput = {
      sort: query?.sort || 'createdAt desc',
      page: +query?.page || 1,
    };
    return this.productsService.getProductsFromProvider(
      getProductsFromProviderInput,
      provider,
    );
  }

  @Get('/:productId')
  @Roles(['Any'])
  async findProductById(
    @Param('productId') productId,
  ): Promise<FindProductByIdOutput> {
    return this.productsService.findProductById({ productId });
  }

  @Post('')
  @Roles(['Provider', 'Admin'])
  async createProduct(
    @Body() createProductInput: CreateProductInput,
    @AuthUser() provider: User,
  ): Promise<CreateProductOutput> {
    return this.productsService.createProduct(createProductInput, provider);
  }

  @Put('/:productId')
  @Roles(['Provider', 'Admin'])
  async editProduct(
    @Param('productId') productId,
    @Body() body,
    @AuthUser() provider: User,
  ): Promise<EditProductOutput> {
    const editProductInput: EditProductInput = {
      ...body,
      productId,
    };
    return this.productsService.editProduct(editProductInput, provider);
  }

  @Delete('/:productId')
  @Roles(['Provider', 'Admin'])
  async deleteProduct(
    @Param('productId') productId,
    @AuthUser() provider: User,
  ): Promise<DeleteProductOutput> {
    return this.productsService.deleteProduct({ productId }, provider);
  }
}
