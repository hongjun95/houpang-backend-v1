import { Field, InputType, ObjectType } from '@nestjs/graphql';

import {
  PaginationInput,
  PaginationOutput,
} from 'src/apis/common/dtos/pagination.dto';
import { Review } from '../entities/review.entity';

@InputType()
export class GetReviewsOnProductInput extends PaginationInput {
  @Field((type) => String)
  productId: string;
}

@ObjectType()
export class GetReviewsOnProductOutput extends PaginationOutput {
  @Field((type) => [Review])
  reviews?: Review[];
}
