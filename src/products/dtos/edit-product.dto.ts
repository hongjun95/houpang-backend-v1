import {
  Field,
  InputType,
  ObjectType,
  PartialType,
  PickType,
} from '@nestjs/graphql';

import { CoreOutput } from 'src/common/dtos/output.dto';
import { Product } from '../entities/product';

@InputType()
export class EditProductInput extends PickType(PartialType(Product), [
  'name',
  'price',
  'images',
  'info',
]) {
  @Field((type) => String)
  productId: string;

  @Field((type) => String)
  categoryName: string;
}

@ObjectType()
export class EditProductOutput extends CoreOutput {}
