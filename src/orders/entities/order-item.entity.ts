import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { CoreEntity } from 'src/common/entities/common.entity';
import { Product } from 'src/products/entities/product';
import { Column, Entity, ManyToOne, RelationId } from 'typeorm';
import { Order } from './order.entity';

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
    onDelete: 'SET NULL',
  })
  product: Product;

  @RelationId((orderItem: OrderItem) => orderItem.order)
  productId: number;

  @Column()
  @Field((type) => Int, { defaultValue: 1 })
  count: number;
}
