import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { SortState } from '@apis/common/common';

import {
  PaginationInput,
  PaginationOutput,
} from '@apis/common/dtos/pagination.dto';
import { Product } from '@apis/products/entities/product.entity';

@InputType()
export class GetProductsByCategoryIdInput extends PaginationInput {
  @Field((type) => String)
  categoryId: string;

  @Field((type) => String, { defaultValue: 'createdAt desc' })
  sort?: SortState;
}

@ObjectType()
export class GetProductsByCategoryIdOutput extends PaginationOutput {
  @Field((type) => [Product], { nullable: true })
  products?: Product[];

  @Field((type) => String, { nullable: true })
  categoryName?: string;
}
