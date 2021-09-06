import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Review } from '../entities/review.entity';

@InputType()
export class GetReviewsOnProductInput {
  @Field((type) => String)
  productId: string;
}

@ObjectType()
export class GetReviewsOnProductOutput extends CoreOutput {
  @Field((type) => [Review])
  reviews?: Review[];
}
