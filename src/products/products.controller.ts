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
import { User } from 'src/users/entities/user.entity';
import {
  CreateProductInput,
  CreateProductOutput,
} from './dtos/create-product.dto';
import { DeleteProductOutput } from './dtos/delete-product.dto';
import { EditProductInput, EditProductOutput } from './dtos/edit-product.dto';
import { FindProductByIdOutput } from './dtos/find-product-by-id.dto';
import { GetAllProductsOutput } from './dtos/get-all-products.dto';
import { ProductsService } from './products.service';

@Controller('products/')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('')
  @Roles(['Any'])
  async getAllProducts(
    @Query('page') page, //
  ): Promise<GetAllProductsOutput> {
    return this.productsService.getAllProducts({ page });
  }

  @Get(':productId/')
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

  @Put(':productId/')
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

  @Delete(':productId/')
  @Roles(['Provider', 'Admin'])
  async deleteProduct(
    @Param('productId') productId,
    @AuthUser() provider: User,
  ): Promise<DeleteProductOutput> {
    return this.productsService.deleteProduct({ productId }, provider);
  }
}
