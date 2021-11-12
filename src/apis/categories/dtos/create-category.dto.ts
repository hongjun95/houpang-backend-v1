import { InputType, ObjectType, PickType } from '@nestjs/graphql';

import { CoreOutput } from '@apis/common/dtos/output.dto';
import { Category } from '@apis/categories/entities/category.entity';

@InputType()
export class CreateCategoryInput extends PickType(Category, [
  'name',
  'coverImg',
]) {}

@ObjectType()
export class CreateCategoryOutput extends CoreOutput {}
