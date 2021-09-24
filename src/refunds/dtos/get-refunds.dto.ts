import { Field, InputType, ObjectType } from '@nestjs/graphql';
import {
  PaginationInput,
  PaginationOutput,
} from 'src/common/dtos/pagination.dto';

import { Refund } from '../entities/refund.entity';

@InputType()
export class GetRefundsInput extends PaginationInput {}

@ObjectType()
export class GetRefundsOutput extends PaginationOutput {
  @Field((type) => [Refund], { nullable: true })
  refundItems?: Refund[];
}
