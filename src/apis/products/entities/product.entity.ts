import { Field, Float, InputType, Int, ObjectType } from '@nestjs/graphql';
import { IsNumber, IsString, Max, Min } from 'class-validator';
import { Column, Entity, ManyToOne, OneToMany, RelationId } from 'typeorm';

import { CommonEntity } from '@apis/common/entities/common.entity';
import { User } from '@apis/users/entities/user.entity';
import { Category } from '@apis/categories/entities/category.entity';
import { OrderItem } from '@apis/orders/entities/order-item.entity';
import { Review } from '@apis/reviews/entities/review.entity';

@InputType('InfoItemInputType', { isAbstract: true })
@ObjectType()
export class InfoItem {
  @Field((type) => Int)
  @IsNumber()
  id: number;

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
export class Product extends CommonEntity {
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
  @Min(0)
  price: number;

  @Column({ default: 0 })
  @Field((type) => Int, { defaultValue: 0 })
  @IsNumber()
  @Min(0)
  stock: number;

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
  infos?: InfoItem[];

  @OneToMany((type) => OrderItem, (orderItem) => orderItem.order, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  @Field((type) => [OrderItem], { nullable: true })
  orderItems?: OrderItem[];

  @OneToMany((type) => Review, (reviews) => reviews.product, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  @Field((type) => [Review], { nullable: true })
  reviews?: Review[];

  @Field((type) => Float, { defaultValue: 0 })
  @Column({ default: 0 })
  @Min(0)
  @Max(5)
  avgRating?: number;
}
