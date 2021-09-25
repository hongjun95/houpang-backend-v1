import { Field, InputType, ObjectType } from '@nestjs/graphql';

import { CoreOutput } from 'src/apis/common/dtos/output.dto';

@InputType()
export class DeleteProductInput {
  @Field((type) => String)
  productId: string;
}

@ObjectType()
export class DeleteProductOutput extends CoreOutput {}
