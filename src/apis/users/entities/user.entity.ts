import {
  Field,
  InputType,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { InternalServerErrorException, Logger } from '@nestjs/common';
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsString,
  MinLength,
} from 'class-validator';
import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany } from 'typeorm';
import bcrypt from 'bcrypt';
import { ApiProperty } from '@nestjs/swagger';

import { CommonEntity } from '@apis/common/entities/common.entity';
import { Product } from '@apis/products/entities/product.entity';
import { Order } from '@apis/orders/entities/order.entity';
import { Review } from '@apis/reviews/entities/review.entity';
import { Refund } from '@apis/refunds/entities/refund.entity';
import { OrderItem } from '@apis/orders/entities/order-item.entity';

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
  private logger = new Logger('User');

  @ApiProperty({
    example: 'lewis@gmail.com',
    description: 'email',
    required: true,
    type: String,
  })
  @Column({ unique: true, type: 'text' })
  @Field(() => String)
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'hongjun',
    description: 'username',
    required: true,
    type: String,
  })
  @Column({ unique: true })
  @Field(() => String)
  @IsString()
  username: string;

  @ApiProperty({
    example: 'animal!@123',
    description: 'password',
    required: true,
    type: String,
    minLength: 8,
  })
  @Column({ select: false })
  @Field(() => String)
  @MinLength(8)
  password: string;

  @ApiProperty({
    example: UserRole.Consumer,
    description: 'User Role',
    required: true,
    enum: UserRole,
  })
  @Column({ type: 'enum', enum: UserRole, default: UserRole.Consumer })
  @Field(() => UserRole)
  @IsEnum(UserRole)
  role: UserRole;

  @ApiProperty({
    example: false,
    description: 'email verification',
    required: true,
    type: Boolean,
  })
  @Column({ default: false })
  @Field(() => Boolean)
  @IsBoolean()
  verified: boolean;

  @ApiProperty({
    example: Language.Korean,
    description: 'Language',
    required: true,
    enum: Language,
  })
  @Column({ default: Language.Korean })
  @Field(() => Language)
  @IsEnum(Language)
  language: Language;

  @ApiProperty({
    example: 'Hello World',
    description: 'Biography',
    type: String,
  })
  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  @IsString()
  bio?: string;

  @ApiProperty({
    example: '010-1234-5678',
    description: 'Phone number',
    required: true,
    type: String,
  })
  @Column()
  @Field(() => String)
  @IsString()
  phoneNumber: string;

  @ApiProperty({
    example: 'https://image-url',
    description: 'Image url',
    type: String,
  })
  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  userImg?: string;

  @ApiProperty({
    example: 'Seoul Myeong-dong',
    description: 'Address',
    required: true,
    type: String,
  })
  @Column()
  @Field(() => String)
  @IsString()
  address: string;

  @ApiProperty({
    example: 'products',
    description: 'products',
    required: true,
    type: [Product],
  })
  @OneToMany(() => Product, (product) => product.provider)
  @Field(() => [Product])
  products: Product[];

  @ApiProperty({
    example: 'orders',
    description: 'Orders',
    required: true,
    type: [Order],
  })
  @OneToMany(() => Order, (order) => order.consumer)
  @Field(() => [Order])
  orders: Order[];

  @ApiProperty({
    example: 'refund',
    description: 'Refund',
    required: true,
    type: [Refund],
  })
  @OneToMany(() => Refund, (refund) => refund.refundee)
  @Field(() => [Refund])
  refunds: Refund[];

  @ApiProperty({
    example: 'Order Item',
    description: 'Order Item',
    required: true,
    type: [OrderItem],
  })
  @OneToMany(() => OrderItem, (orderItem) => orderItem.consumer)
  @Field(() => [OrderItem])
  orderItems: OrderItem[];

  @ApiProperty({
    example: 'Review',
    description: 'Review',
    required: true,
    type: [Review],
  })
  @OneToMany(() => Review, (review) => review.commenter)
  @Field(() => [Review])
  reviews: Review[];

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(): Promise<void> {
    if (this.password) {
      try {
        const salt = await bcrypt.genSalt();

        this.password = await bcrypt.hash(this.password, salt);
      } catch (e) {
        this.logger.error(e);
        throw new InternalServerErrorException();
      }
    }
  }

  async checkPassowrd(password: string): Promise<boolean> {
    try {
      const ok = await bcrypt.compare(password, this.password);
      return ok;
    } catch (e) {
      this.logger.error(e);
      throw new InternalServerErrorException();
    }
  }
}
