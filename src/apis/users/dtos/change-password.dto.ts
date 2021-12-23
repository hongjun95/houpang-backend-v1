import { ApiProperty } from '@nestjs/swagger';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { MinLength } from 'class-validator';

import { CoreOutput } from '@apis/common/dtos/output.dto';

@InputType()
export class ChangePasswordInput {
  @ApiProperty({
    example: 'animal!@123',
    description: 'Current password',
    required: true,
    type: String,
    minLength: 8,
  })
  @Field(() => String)
  @MinLength(8)
  currentPassword: string;

  @ApiProperty({
    example: 'animal!@1234',
    description: 'New password',
    required: true,
    type: String,
    minLength: 8,
  })
  @Field(() => String)
  @MinLength(8)
  newPassword: string;

  @ApiProperty({
    example: 'animal!@1234',
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
export class ChangePasswordOutput extends CoreOutput {}
