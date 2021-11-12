import { Field, InputType, ObjectType } from '@nestjs/graphql';

import { CoreOutput } from '@apis/common/dtos/output.dto';
import { OrderItem } from '@apis/orders/entities/order-item.entity';

@InputType()
export class CancelOrderItemInput {
  @Field((type) => String)
  orderItemId: string;
}

@ObjectType()
export class CancelOrderItemOutput extends CoreOutput {
  @Field((type) => OrderItem, { nullable: true })
  orderItem?: OrderItem;
}
