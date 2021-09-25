import { Field, InputType, ObjectType } from '@nestjs/graphql';
import {
  PaginationInput,
  PaginationOutput,
} from 'src/apis/common/dtos/pagination.dto';
import { OrderItem } from 'src/apis/orders/entities/order-item.entity';

@InputType()
export class GetRefundsFromProviderInput extends PaginationInput {
  @Field((type) => String)
  providerId: string;
}

@ObjectType()
export class GetRefundsFromProviderOutput extends PaginationOutput {
  @Field((type) => [OrderItem], { nullable: true })
  orderItems?: OrderItem[];
}
