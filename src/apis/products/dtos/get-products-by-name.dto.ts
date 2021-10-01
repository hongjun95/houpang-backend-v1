import { Field, InputType, ObjectType } from '@nestjs/graphql';
import {
  PaginationInput,
  PaginationOutput,
} from 'src/apis/common/dtos/pagination.dto';

import { Product } from '../entities/product.entity';

@InputType()
export class GetProductsBySearchTermInput extends PaginationInput {
  @Field((type) => String)
  q: string;
}

@ObjectType()
export class GetProductsBySearchTermOutput extends PaginationOutput {
  @Field((type) => [Product], { nullable: true })
  products?: Product[];
}
