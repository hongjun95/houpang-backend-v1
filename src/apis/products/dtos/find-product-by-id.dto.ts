import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from '@apis/common/dtos/output.dto';

import { Product } from '@apis/products/entities/product.entity';

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
