import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';

import { CoreOutput } from 'src/apis/common/dtos/output.dto';
import { Product } from '../entities/product.entity';

@InputType()
export class CreateProductInput extends PickType(Product, [
  'name',
  'price',
  'images',
  'stock',
  'infos',
]) {
  @Field((type) => String)
  categoryName: string;
}

@ObjectType()
export class CreateProductOutput extends CoreOutput {
  @Field((type) => Product, { nullable: true })
  product?: Product;
}
