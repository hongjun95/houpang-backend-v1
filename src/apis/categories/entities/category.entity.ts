import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsString, MinLength } from 'class-validator';
import { Column, Entity, OneToMany } from 'typeorm';

import { CommonEntity } from '@apis/common/entities/common.entity';
import { Product } from '@apis/products/entities/product.entity';

@InputType('CategoryInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Category extends CommonEntity {
  @Field((type) => String)
  @Column({ unique: true })
  @IsString()
  @MinLength(1)
  name: string;

  @Field((type) => String, { nullable: true })
  @Column({ nullable: true })
  @IsString()
  coverImg: string;

  @Field((type) => String)
  @Column({ unique: true })
  @IsString()
  slug: string;

  @Field((type) => [Product])
  @OneToMany((type) => Product, (products) => products.category)
  products: Product[];
}
