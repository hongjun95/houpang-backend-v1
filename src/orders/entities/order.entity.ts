import {
  Field,
  InputType,
  Int,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { IsNumber, IsString } from 'class-validator';
import { CoreEntity } from 'src/common/entities/common.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToOne,
  OneToMany,
  RelationId,
} from 'typeorm';
import { OrderItem } from './order-item.entity';

export enum OrderStatus {
  Checking = '확인중',
  Received = '주문 접수',
  Delivering = '배달중',
  Delivered = '배달 완료',
  Canceled = '주문 취소',
}

registerEnumType(OrderStatus, { name: 'OrderStatus' });

// deliver_request, payment_method
@InputType('OrderInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Order extends CoreEntity {
  @Field((type) => User)
  @ManyToOne((type) => User, (user) => user.orders, {
    onDelete: 'SET NULL',
  })
  consumer: User;

  @RelationId((order: Order) => order.consumer)
  consumerId: number;

  @Field((type) => [OrderItem])
  @OneToMany((type) => OrderItem, (orderItem) => orderItem.order)
  @JoinTable()
  orderItems: OrderItem[];

  @Field((type) => Int)
  @Column()
  @IsNumber()
  total: number;

  @Field((type) => String)
  @Column({ default: '' })
  @IsString()
  destination: string;

  @Field((type) => String)
  @Column({ default: '문 앞' })
  @IsString()
  deliverRequest: string;

  @Field((type) => OrderStatus)
  @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.Checking })
  status: OrderStatus;

  @Field((type) => String)
  @Column()
  orderedAt: string;
}
