import { Field, InputType, ObjectType } from '@nestjs/graphql';
import {
  PaginationInput,
  PaginationOutput,
} from '@apis/common/dtos/pagination.dto';

import { Refund } from '@apis/refunds/entities/refund.entity';

@InputType()
export class GetRefundsFromConsumerInput extends PaginationInput {
  @Field((type) => String)
  consumerId: string;
}

@ObjectType()
export class GetRefundsFromConsumerOutput extends PaginationOutput {
  @Field((type) => [Refund], { nullable: true })
  refundItems?: Refund[];
}
