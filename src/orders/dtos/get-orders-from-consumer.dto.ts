import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Order } from '../entities/order.entity';

@InputType()
export class GetOrdersFromConsumerInput {
  @Field((type) => String)
  consumerId: string;
}

@ObjectType()
export class GetOrdersFromConsumerOutput extends CoreOutput {
  @Field((type) => [Order], { nullable: true })
  orders?: Order[];
}
