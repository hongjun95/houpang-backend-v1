import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { OrderItem } from '../entities/order-item.entity';
import { OrderStatus } from '../entities/order.entity';

@InputType()
export class GetOrdersFromProviderInput {
  @Field((type) => OrderStatus, { nullable: true })
  status?: OrderStatus;
}

@ObjectType()
export class GetOrdersFromProviderOutput extends CoreOutput {
  @Field((type) => [OrderItem], { nullable: true })
  orderItems?: OrderItem[];
}
