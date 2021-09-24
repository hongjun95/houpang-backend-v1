import { Field, InputType, ObjectType } from '@nestjs/graphql';
import {
  PaginationInput,
  PaginationOutput,
} from 'src/common/dtos/pagination.dto';
import { OrderItem } from '../entities/order-item.entity';

@InputType()
export class GetOrdersFromProviderInput extends PaginationInput {
  @Field((type) => String)
  providerId: string;
}

@ObjectType()
export class GetOrdersFromProviderOutput extends PaginationOutput {
  @Field((type) => [OrderItem], { nullable: true })
  orderItems?: OrderItem[];
}
