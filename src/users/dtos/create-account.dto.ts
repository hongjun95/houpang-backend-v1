import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { MinLength } from 'class-validator';

import { CoreOutput } from 'src/common/dtos/output.dto';
import { User } from '../entities/user.entity';

@InputType()
export class CreateAccountInput extends PickType(User, [
  'email',
  'password',
  'bio',
  'language',
]) {
  @Field((type) => String)
  @MinLength(8)
  verifyPassword: string;
}

@ObjectType()
export class CreateAccountOutput extends CoreOutput {}
