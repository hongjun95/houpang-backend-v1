import {
  Field,
  InputType,
  ObjectType,
  PartialType,
  PickType,
} from '@nestjs/graphql';

import { CoreOutput } from '@apis/common/dtos/output.dto';
import { Review } from '@apis/reviews/entities/review.entity';

@InputType()
export class EditReviewInput extends PickType(PartialType(Review), [
  'content',
  'id',
]) {}

@ObjectType()
export class EditReviewOutput extends CoreOutput {
  @Field((type) => Review)
  review?: Review;
}
