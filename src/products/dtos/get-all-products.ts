import { Field, InputType, ObjectType } from '@nestjs/graphql';

import {
  PaginationInput,
  PaginationOutput,
} from 'src/common/dtos/pagination.dto';
import { Product } from '../entities/product';

@InputType()
export class GetAllProductsInput extends PaginationInput {}

@ObjectType()
export class GetAllProductsOutput extends PaginationOutput {
  @Field((type) => [Product])
  products?: Product[];
}
