import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Order, OrderStatus } from '../entities/order.entity';

@InputType()
export class GetOrdersFromConsumerInput {
  @Field((type) => OrderStatus, { nullable: true })
  status?: OrderStatus;

  @Field((type) => String)
  customerId: string;
}

@ObjectType()
export class GetOrdersFromConsumerOutput extends CoreOutput {
  @Field((type) => [Order], { nullable: true })
  orders?: Order[];
}
