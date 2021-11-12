import { Field, InputType, ObjectType } from '@nestjs/graphql';
import {
  PaginationInput,
  PaginationOutput,
} from '@apis/common/dtos/pagination.dto';
import { Refund } from '@apis/refunds/entities/refund.entity';

@InputType()
export class GetRefundsFromProviderInput extends PaginationInput {
  @Field((type) => String)
  providerId: string;
}

@ObjectType()
export class GetRefundsFromProviderOutput extends PaginationOutput {
  @Field((type) => [Refund], { nullable: true })
  refundItems?: Refund[];
}
