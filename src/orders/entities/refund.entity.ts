import {
  Field,
  InputType,
  Int,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { CoreEntity } from 'src/common/entities/common.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { OrderItem } from './order-item.entity';

export enum RefundStatus {
  Exchanged = '교환',
  Refunded = '환불',
}

registerEnumType(RefundStatus, { name: 'RefundStatus' });

@InputType('RefundInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Refund extends CoreEntity {
  @OneToOne(() => OrderItem, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  @Field((type) => OrderItem)
  orderItem: OrderItem;

  @Column()
  @Field((type) => Int, { defaultValue: 1 })
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

  @Field((type) => String)
  @Column()
  recallDescription?: string;

  @Field((type) => String)
  @Column()
  sendPlace?: string;

  @Field((type) => Date)
  @Column()
  sendDay?: Date;

  @Field((type) => Int)
  @Column()
  refundPay?: number;
}
