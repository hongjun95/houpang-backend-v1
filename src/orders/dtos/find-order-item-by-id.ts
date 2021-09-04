import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { OrderItem } from '../entities/order-item.entity';

@InputType()
export class FindOrderItemByIdInput {
  @Field((type) => String)
  orderItemId: string;

  @Field((type) => String)
  providerId: string;
}

@ObjectType()
export class FindOrderItemByIdOutput extends CoreOutput {
  @Field((type) => OrderItem, { nullable: true })
  orderItem?: OrderItem;
}
