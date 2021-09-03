import { InputType, ObjectType, PartialType, PickType } from '@nestjs/graphql';

import { CoreOutput } from 'src/common/dtos/output.dto';
import { Product } from '../entities/product';

@InputType()
export class EditProductInput extends PartialType(
  PickType(Product, ['id', 'name', 'price', 'images', 'info']),
) {}

@ObjectType()
export class EditProductOutput extends CoreOutput {}
