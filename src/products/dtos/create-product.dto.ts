import { InputType, ObjectType, PickType } from '@nestjs/graphql';

import { CoreOutput } from 'src/common/dtos/output.dto';
import { Product } from '../entities/product';

@InputType()
export class CreateProductInput extends PickType(Product, [
  'name',
  'price',
  'images',
  'info',
]) {}

@ObjectType()
export class CreateProductOutput extends CoreOutput {}
