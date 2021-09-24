import { Field, InputType, ObjectType } from '@nestjs/graphql';
import {
  PaginationInput,
  PaginationOutput,
} from 'src/common/dtos/pagination.dto';
import { Order } from '../entities/order.entity';

@InputType()
export class GetOrdersFromConsumerInput extends PaginationInput {
  @Field((type) => String)
  consumerId: string;
}

@ObjectType()
export class GetOrdersFromConsumerOutput extends PaginationOutput {
  @Field((type) => [Order], { nullable: true })
  orders?: Order[];
}
