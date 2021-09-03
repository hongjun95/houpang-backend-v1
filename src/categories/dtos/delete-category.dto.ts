import { Field, InputType, ObjectType } from '@nestjs/graphql';

import { CoreOutput } from 'src/common/dtos/output.dto';

@InputType()
export class DeleteCategoryInput {
  @Field((type) => String)
  categoryId: string;
}

@ObjectType()
export class DeleteCategoryOutput extends CoreOutput {}
