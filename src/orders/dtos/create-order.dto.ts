import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';

@InputType()
export class CreateOrderItemInput {
  @Field((type) => String)
  productId: string;

  @Field((type) => Int, { defaultValue: 1 })
  count: number;
}

@InputType()
export class CreateOrderInput {
  @Field((type) => [CreateOrderItemInput])
  createOrderItems: CreateOrderItemInput[];
}

@ObjectType()
export class CreateOrderOutput extends CoreOutput {
  @Field((type) => String, { nullable: true })
  orderId?: string;
}
