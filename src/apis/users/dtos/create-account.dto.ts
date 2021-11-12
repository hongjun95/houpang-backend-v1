import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { MinLength } from 'class-validator';

import { CoreOutput } from '@apis/common/dtos/output.dto';
import { User } from '@apis/users/entities/user.entity';

@InputType()
export class CreateAccountInput extends PickType(User, [
  'email',
  'username',
  'password',
  'language',
  'phoneNumber',
  'address',
  'userImg',
]) {
  @Field((type) => String, { nullable: true })
  bio?: string;

  @Field((type) => String)
  @MinLength(8)
  verifyPassword: string;
}

@ObjectType()
export class CreateAccountOutput extends CoreOutput {}
