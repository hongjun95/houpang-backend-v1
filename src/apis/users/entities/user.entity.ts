import {
  Field,
  InputType,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { InternalServerErrorException } from '@nestjs/common';
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsString,
  MinLength,
} from 'class-validator';
import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { CommonEntity } from '../../common/entities/common.entity';
import { Product } from '../../products/entities/product.entity';
import { Order } from '../../orders/entities/order.entity';
import { Review } from '../../reviews/entities/review.entity';
import { Refund } from '../../refunds/entities/refund.entity';
import { OrderItem } from '../../orders/entities/order-item.entity';

export enum UserRole {
  Consumer = 'Consumer',
  Provider = 'Provider',
  Admin = 'Admin',
}

export enum Language {
  Korean = 'Korean',
  English = 'English',
}

registerEnumType(UserRole, { name: 'UserRole' });
registerEnumType(Language, { name: 'Language' });

@InputType('UserInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class User extends CommonEntity {
  @Column({ unique: true, type: 'text' })
  @Field((type) => String)
  @IsEmail()
  email: string;

  @Column({ unique: true })
  @Field((type) => String)
  @IsString()
  username: string;

  @Column()
  @Field((type) => String)
  @MinLength(8)
  password: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.Consumer })
  @Field((type) => UserRole)
  @IsEnum(UserRole)
  role: UserRole;

  @Column({ default: false })
  @Field((type) => Boolean)
  @IsBoolean()
  verified: boolean;

  @Column({ default: Language.Korean })
  @Field((type) => Language)
  @IsEnum(Language)
  language: Language;

  @Column({ nullable: true })
  @Field((type) => String, { nullable: true })
  @IsString()
  bio?: string;

  @Column()
  @Field((type) => String)
  @IsString()
  phoneNumber: string;

  @Column({ nullable: true })
  @Field((type) => String, { nullable: true })
  userImg?: string;

  @Column()
  @Field((type) => String)
  @IsString()
  address: string;

  @OneToMany((type) => Product, (product) => product.provider)
  @Field((type) => [Product])
  products: Product[];

  @OneToMany((type) => Order, (order) => order.consumer)
  @Field((type) => [Order])
  orders: Order[];

  @OneToMany((type) => Refund, (refund) => refund.refundee)
  @Field((type) => [Refund])
  refunds: Refund[];

  @OneToMany((type) => OrderItem, (orderItem) => orderItem.consumer)
  @Field((type) => [OrderItem])
  orderItems: OrderItem[];

  @OneToMany((type) => Review, (review) => review.commenter)
  @Field((type) => [Review])
  reviews: Review[];

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(): Promise<void> {
    if (this.password) {
      try {
        this.password = await bcrypt.hash(this.password, 10);
      } catch (e) {
        console.error(e);
        throw new InternalServerErrorException();
      }
    }
  }

  async checkPassowrd(password: string): Promise<boolean> {
    try {
      const ok = await bcrypt.compare(password, this.password);
      return ok;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException();
    }
  }
}
