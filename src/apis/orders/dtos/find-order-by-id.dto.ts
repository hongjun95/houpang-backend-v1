import { Field, InputType, ObjectType } from '@nestjs/graphql';

import { CoreOutput } from '@src/apis/common/dtos/output.dto';
import { Order } from '@apis/orders/entities/order.entity';

@InputType()
export class FindOrderByIdInput {
  @Field(() => String)
  orderId: string;

  @Field(() => String)
  consumerId: string;
}

@ObjectType()
export class FindOrderByIdOutput extends CoreOutput {
  @Field(() => Order, { nullable: true })
  order?: Order;
}
