import { InputType, ObjectType, PartialType, PickType } from '@nestjs/graphql';

import { CoreOutput } from '@apis/common/dtos/output.dto';
import { User } from '@apis/users/entities/user.entity';

@InputType()
export class EditProfileInput extends PickType(PartialType(User), [
  'email',
  'username',
  'language',
  'bio',
  'phoneNumber',
  'address',
  'userImg',
]) {}

@ObjectType()
export class EditProfileOutput extends CoreOutput {}
