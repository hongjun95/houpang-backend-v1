import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';

import { Product } from '../entities/product';

@InputType()
export class FindProductByIdInput {
  @Field((type) => String)
  productId: string;
}

@ObjectType()
export class FindProductByIdOutput extends CoreOutput {
  @Field((type) => Product, { nullable: true })
  product?: Product;
}
