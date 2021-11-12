import { Field, InputType, ObjectType } from '@nestjs/graphql';

import { CoreOutput } from '@apis/common/dtos/output.dto';

@InputType()
export class DeleteReviewInput {
  @Field((type) => String)
  reviewId: string;
}

@ObjectType()
export class DeleteReviewOutput extends CoreOutput {}
