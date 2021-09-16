import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Product } from '../entities/product';

@InputType()
export class GetProductsFromProviderInput {}

@ObjectType()
export class GetProductsFromProviderOutput extends CoreOutput {
  @Field((type) => [Product], { nullable: true })
  products?: Product[];
}
