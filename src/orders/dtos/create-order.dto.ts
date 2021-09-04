import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';

@InputType()
export class CreateOrderInput {
  @Field((type) => [String])
  productIds: string[];
}

@ObjectType()
export class CreateOrderOutput extends CoreOutput {
  @Field((type) => String, { nullable: true })
  orderId?: string;
}
