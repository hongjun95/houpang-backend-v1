import { Field, InputType, ObjectType } from '@nestjs/graphql';

import {
  PaginationInput,
  PaginationOutput,
} from 'src/apis/common/dtos/pagination.dto';
import { Product } from 'src/apis/products/entities/product.entity';

export type SortState = 'createdAt desc' | 'price desc' | 'price asc';

@InputType()
export class GetProductsByCategoryIdInput extends PaginationInput {
  @Field((type) => String)
  categoryId: string;

  @Field((type) => String, { defaultValue: 'created_at desc' })
  order?: SortState;
}

@ObjectType()
export class GetProductsByCategoryIdOutput extends PaginationOutput {
  @Field((type) => [Product], { nullable: true })
  products?: Product[];

  @Field((type) => String, { nullable: true })
  categoryName?: string;
}
