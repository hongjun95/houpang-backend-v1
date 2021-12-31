import {
  Field,
  InputType,
  ObjectType,
  PartialType,
  PickType,
} from '@nestjs/graphql';

import { CoreOutput } from '@apis/common/dtos/output.dto';
import { Product } from '@apis/products/entities/product.entity';

@InputType()
export class EditProductInput extends PickType(PartialType(Product), [
  'name',
  'price',
  'images',
  'stock',
  'infos',
]) {
  @Field((type) => String)
  productId: string;

  @Field((type) => String)
  categoryName: string;
}

@ObjectType()
export class EditProductOutput extends CoreOutput {}
