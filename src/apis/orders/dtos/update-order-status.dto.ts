import { Field, InputType, ObjectType } from '@nestjs/graphql';

import { CoreOutput } from '@apis/common/dtos/output.dto';
import {
  OrderItem,
  OrderStatus,
} from '@apis/orders/entities/order-item.entity';

@InputType()
export class UpdateOrerStatusInput {
  @Field((type) => String)
  orderItemId: string;

  @Field((type) => OrderStatus)
  orderStatus: OrderStatus;
}

@ObjectType()
export class UpdateOrerStatusOutput extends CoreOutput {
  @Field((type) => OrderItem, { nullable: true })
  orderItem?: OrderItem;
}
