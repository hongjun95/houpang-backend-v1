import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Review } from '../entities/review.entity';

@InputType()
export class GetReviewsOnConsumerInput {
  @Field((type) => String)
  consumerId: string;
}

@ObjectType()
export class GetReviewsOnConsumerOutput extends CoreOutput {
  @Field((type) => [Review])
  reviews?: Review[];
}
