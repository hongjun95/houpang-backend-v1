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

import { CoreEntity } from 'src/common/entities/common.entity';
import { User } from 'src/users/entities/user.entity';
import { Category } from 'src/categories/entities/category.entity';
import { OrderItem } from 'src/orders/entities/order-item.entity';

@InputType('InfoItemInputType', { isAbstract: true })
@ObjectType()
export class InfoItem {
  @Field((type) => String)
  @IsString()
  key: string;

  @Field((type) => String)
  @IsString()
  value: string;
}

@InputType('ProductInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Product extends CoreEntity {
  @Column()
  @Field((type) => String)
  @IsString()
  name: string;

  @ManyToOne((type) => User, (user) => user.products, {
    onDelete: 'CASCADE',
  })
  @Field((type) => User)
  provider: User;

  @RelationId((product: Product) => product.provider)
  providerId: number;

  @Column()
  @Field((type) => Int)
  @IsNumber()
  price: number;

  @Column('text', { array: true })
  @Field((type) => [String])
  images: string[];

  @ManyToOne((type) => Category, (category) => category.products, {
    onDelete: 'SET NULL',
  })
  @Field((type) => Category)
  category: Category;

  @RelationId((product: Product) => product.category)
  categoryId: number;

  @Field((type) => [InfoItem], { nullable: true })
  @Column({ nullable: true, type: 'json' })
  info?: InfoItem[];

  @Field((type) => [OrderItem])
  @OneToMany((type) => OrderItem, (orderItem) => orderItem.order)
  @JoinTable()
  orderItems: OrderItem[];

  // @OneToMany((type) => Review, (reviews) => reviews.product, {
  //   onDelete: 'CASCADE',
  // })
  // @Field((type) => Review)
  // reviews: Review;
}
