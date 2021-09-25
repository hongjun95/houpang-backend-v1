import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutput } from 'src/apis/common/dtos/output.dto';
import { OrderItem } from '../../orders/entities/order-item.entity';
import { Refund } from '../entities/refund.entity';

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
