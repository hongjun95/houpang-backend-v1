import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { IsNumber, IsString } from 'class-validator';
import {
  Column,
  Entity,
  JoinTable,
  ManyToOne,
  OneToMany,
  RelationId,
} from 'typeorm';

import { CoreEntity } from '../../common/entities/common.entity';
import { User } from '../../users/entities/user.entity';
import { OrderItem } from './order-item.entity';

// payment_method
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

  @Field((type) => String)
  @Column()
  orderedAt: string;
}
