import {
  Field,
  InputType,
  Int,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { Column, Entity, ManyToOne, RelationId } from 'typeorm';

import { CoreEntity } from '../../common/entities/common.entity';
import { Product } from '../../products/entities/product.entity';
import { Order } from './order.entity';

export enum OrderStatus {
  Checking = '확인중',
  Received = '주문 접수',
  Delivering = '배달중',
  Delivered = '배달 완료',
  Canceled = '주문 취소',
  Exchanged = '교환',
  Refunded = '환불',
}

registerEnumType(OrderStatus, { name: 'OrderStatus' });

@InputType('OrderItemInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class OrderItem extends CoreEntity {
  @Field((type) => Order)
  @ManyToOne((type) => Order, (order) => order.orderItems, {
    onDelete: 'CASCADE',
  })
  order: Order;

  @RelationId((orderItem: OrderItem) => orderItem.order)
  orderId: number;

  @Field((type) => Product)
  @ManyToOne((type) => Product, (product) => product.orderItems, {
    onDelete: 'CASCADE',
  })
  product: Product;

  @RelationId((orderItem: OrderItem) => orderItem.order)
  productId: number;

  @Column()
  @Field((type) => Int, { defaultValue: 1 })
  count: number;

  @Field((type) => OrderStatus)
  @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.Checking })
  status: OrderStatus;
}
