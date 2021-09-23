import {
  Field,
  InputType,
  Int,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { CoreEntity } from 'src/common/entities/common.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { OrderItem } from './order-item.entity';

export enum ReturnStatus {
  Exchanged = '교환',
  Returned = '환불',
}

registerEnumType(ReturnStatus, { name: 'ReturnStatus' });

@InputType('OrderItemInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Return extends CoreEntity {
  @OneToOne(() => OrderItem, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  @Field((type) => OrderItem)
  orderItem: OrderItem;

  @Column()
  @Field((type) => Int, { defaultValue: 1 })
  count: number;

  @Field((type) => ReturnStatus)
  @Column({ type: 'enum', enum: ReturnStatus })
  status: ReturnStatus;

  @Field((type) => String)
  @Column()
  problemTitle: string;

  @Field((type) => String)
  @Column()
  problemDescription: string;
}
