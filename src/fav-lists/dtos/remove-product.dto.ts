import { Field, InputType, ObjectType } from '@nestjs/graphql';

import { CoreOutput } from 'src/common/dtos/output.dto';

@InputType()
export class RemoveProductInput {
  @Field((type) => String)
  productId: string;
}

@ObjectType()
export class RemoveProductOutput extends CoreOutput {}
