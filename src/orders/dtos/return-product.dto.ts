import { Field, InputType, Int, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { OrderItem, OrderStatus } from '../entities/order-item.entity';
import { Return } from '../entities/return.entity';

@InputType()
export class ReturnProductInput extends PickType(Return, [
  'count',
  'problemDescription',
  'problemTitle',
  'status',
]) {
  @Field((type) => String)
  orderItemId: string;
}

@ObjectType()
export class ReturnProductOutput extends CoreOutput {
  @Field((type) => OrderItem, { nullable: true })
  orderItem?: OrderItem;
}
