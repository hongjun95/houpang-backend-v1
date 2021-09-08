import { Field, InputType, ObjectType } from '@nestjs/graphql';

import { CoreOutput } from 'src/common/dtos/output.dto';

@InputType()
export class LikeProductInput {
  @Field((type) => String)
  productId: string;
}

@ObjectType()
export class LikeProductOutput extends CoreOutput {}
