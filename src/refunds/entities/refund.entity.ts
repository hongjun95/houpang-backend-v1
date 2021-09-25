import {
  Field,
  InputType,
  Int,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';

import { CoreEntity } from '../../common/entities/common.entity';
import { User } from '../../users/entities/user.entity';
import { OrderItem } from '../../orders/entities/order-item.entity';

export enum RefundStatus {
  Exchanged = '교환',
  Refunded = '환불',
}

registerEnumType(RefundStatus, { name: 'RefundStatus' });

@InputType('RefundInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Refund extends CoreEntity {
  @Field((type) => String)
  @Column({ default: '2021.9.24' })
  refundedAt: string;

  @OneToOne(() => OrderItem, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  @Field((type) => OrderItem)
  orderItem: OrderItem;

  @Field((type) => Int, { defaultValue: 1 })
  @Column()
  count: number;

  @Field((type) => String)
  @Column()
  problemTitle: string;

  @Field((type) => String)
  @Column()
  problemDescription: string;

  @Field((type) => RefundStatus)
  @Column({ type: 'enum', enum: RefundStatus })
  status: RefundStatus;

  @ManyToOne((type) => User, (user) => user.products, {
    onDelete: 'CASCADE',
  })
  @Field((type) => User)
  refundee: User;

  @Field((type) => String)
  @Column()
  recallPlace: string;

  @Field((type) => Date)
  @Column()
  recallDay: Date;

  @Field((type) => String)
  @Column()
  recallTitle: string;

  @Field((type) => String, { nullable: true })
  @Column({ nullable: true })
  recallDescription?: string;

  @Field((type) => String, { nullable: true })
  @Column({ nullable: true })
  sendPlace?: string;

  @Field((type) => Date, { nullable: true })
  @Column({ nullable: true })
  sendDay?: Date;

  @Field((type) => Int, { nullable: true })
  @Column({ nullable: true })
  refundPay?: number;
}
