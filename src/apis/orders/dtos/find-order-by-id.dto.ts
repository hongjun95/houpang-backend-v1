import { Field, InputType, ObjectType } from '@nestjs/graphql';

import { CoreOutput } from '@src/apis/common/dtos/output.dto';
import { Order } from '@apis/orders/entities/order.entity';

@InputType()
export class FindOrderByIdInput {
  @Field((type) => String)
  orderId: string;

  @Field((type) => String)
  consumerId: string;
}

@ObjectType()
export class FindOrderByIdOutput extends CoreOutput {
  @Field((type) => Order, { nullable: true })
  order?: Order;
}
