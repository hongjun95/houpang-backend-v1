import { Field, InputType, ObjectType } from '@nestjs/graphql';

import {
  PaginationInput,
  PaginationOutput,
} from 'src/common/dtos/pagination.dto';
import { Product } from 'src/products/entities/product';

const OrderStates = [
  ['createdAt desc', '최신순'],
  ['price desc', '높은가격순'],
  ['price asc', '낮은가격순'],
] as const;
// type OrderState = typeof OrderStates[number][0];
export type OrderState = 'createdAt desc' | 'price desc' | 'price asc';

@InputType()
export class GetProductsByCategoryIdInput extends PaginationInput {
  @Field((type) => String)
  categoryId: string;

  @Field((type) => String, { defaultValue: 'created_at desc' })
  order?: OrderState;
}

@ObjectType()
export class GetProductsByCategoryIdOutput extends PaginationOutput {
  @Field((type) => [Product], { nullable: true })
  products?: Product[];

  @Field((type) => String, { nullable: true })
  categoryName?: string;
}
