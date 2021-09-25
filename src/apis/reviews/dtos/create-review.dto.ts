import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';

import { CoreOutput } from 'src/apis/common/dtos/output.dto';
import { Review } from '../entities/review.entity';

@InputType()
export class CreateReviewInput extends PickType(Review, ['content']) {
  @Field((type) => String)
  orderItemId: string;
}

@ObjectType()
export class CreateReviewOutput extends CoreOutput {
  @Field((type) => Review)
  review?: Review;
}
