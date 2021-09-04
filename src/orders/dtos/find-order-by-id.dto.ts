import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Order } from '../entities/order.entity';

@InputType()
export class FindOrderByIdInput {
  @Field((type) => String)
  orderId: string;
}

@ObjectType()
export class FindOrderByIdOutput extends CoreOutput {
  @Field((type) => Order, { nullable: true })
  order?: Order;
}
