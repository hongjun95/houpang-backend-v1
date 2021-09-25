import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { MinLength } from 'class-validator';

import { CoreOutput } from 'src/apis/common/dtos/output.dto';

@InputType()
export class ChangePasswordInput {
  @Field((type) => String)
  currentPassword: string;

  @Field((type) => String)
  @MinLength(8)
  newPassword: string;

  @Field((type) => String)
  @MinLength(8)
  verifyPassword: string;
}

@ObjectType()
export class ChangePasswordOutput extends CoreOutput {}
