import { ApiProperty, PickType } from '@nestjs/swagger';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
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
  'bio',
]) {
  @ApiProperty({
    example: 'animal!@123',
    description: 'Verify password',
    required: true,
    type: String,
    minLength: 8,
  })
  @Field(() => String)
  @MinLength(8)
  verifyPassword: string;
}

@ObjectType()
export class CreateAccountOutput extends CoreOutput {}
