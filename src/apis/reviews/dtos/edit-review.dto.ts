import {
  Field,
  InputType,
  ObjectType,
  PartialType,
  PickType,
} from '@nestjs/graphql';

import { CoreOutput } from 'src/apis/common/dtos/output.dto';
import { Review } from '../entities/review.entity';

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
