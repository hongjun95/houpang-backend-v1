import { Field, InputType, ObjectType } from '@nestjs/graphql';

import { CoreOutput } from '@apis/common/dtos/output.dto';

@InputType()
export class DeleteProductInput {
  @Field((type) => String)
  productId: string;
}

@ObjectType()
export class DeleteProductOutput extends CoreOutput {}
