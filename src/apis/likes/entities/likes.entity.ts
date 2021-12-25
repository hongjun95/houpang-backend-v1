import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Entity, JoinColumn, JoinTable, ManyToMany, OneToOne } from 'typeorm';

import { CommonEntity } from '@apis/common/entities/common.entity';
import { Product } from '@apis/products/entities/product.entity';
import { User } from '@apis/users/entities/user.entity';

@InputType('LikeInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Like extends CommonEntity {
  @OneToOne(() => User, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  @Field(() => User)
  createdBy: User;

  @ManyToMany(() => Product)
  @JoinTable()
  @Field(() => [Product])
  products: Product[];
}
