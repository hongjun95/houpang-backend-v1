import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';

import { CoreOutput } from '@src/apis/common/dtos/output.dto';

@InputType()
export class CreateOrderItemInput {
  @Field(() => String)
  productId: string;

  @Field(() => Int, { defaultValue: 1 })
  count: number;
}

@InputType()
export class CreateOrderInput {
  @Field(() => [CreateOrderItemInput])
  createOrderItems: CreateOrderItemInput[];

  @Field(() => String)
  destination: string;

  @Field(() => String)
  deliverRequest: string;
}

@ObjectType()
export class CreateOrderOutput extends CoreOutput {
  @Field(() => String, { nullable: true })
  orderId?: string;
}
