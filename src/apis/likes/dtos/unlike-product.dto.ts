import { Field, InputType, ObjectType } from '@nestjs/graphql';

import { CoreOutput } from '@apis/common/dtos/output.dto';

@InputType()
export class UnlikeProductInput {
  @Field((type) => String)
  productId: string;
}

@ObjectType()
export class UnlikeProductOutput extends CoreOutput {}
