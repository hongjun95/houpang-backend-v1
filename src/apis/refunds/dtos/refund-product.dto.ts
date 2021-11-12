import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';

import { CoreOutput } from '@apis/common/dtos/output.dto';
import { OrderItem } from '@apis/orders/entities/order-item.entity';
import { Refund } from '@apis/refunds/entities/refund.entity';

@InputType()
export class RefundProductInput extends PickType(Refund, [
  'count',
  'problemDescription',
  'problemTitle',
  'status',
  'recallPlace',
  'recallDay',
  'recallTitle',
  'recallDescription',
  'sendPlace',
  'sendDay',
  'refundPay',
]) {
  @Field((type) => String)
  orderItemId: string;
}

@ObjectType()
export class RefundProductOutput extends CoreOutput {
  @Field((type) => OrderItem, { nullable: true })
  orderItem?: OrderItem;
}
