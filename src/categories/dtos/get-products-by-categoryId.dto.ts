import { Field, InputType, ObjectType } from '@nestjs/graphql';

import {
  PaginationInput,
  PaginationOutput,
} from 'src/common/dtos/pagination.dto';
import { Product } from 'src/products/entities/product';

@InputType()
export class GetProductsByCategoryIdInput extends PaginationInput {
  @Field((type) => String)
  categoryId: string;
}

@ObjectType()
export class GetProductsByCategoryIdOutput extends PaginationOutput {
  @Field((type) => [Product], { nullable: true })
  products?: Product[];
}
