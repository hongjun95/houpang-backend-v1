import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Entity, JoinColumn, JoinTable, ManyToMany, OneToOne } from 'typeorm';

import { CoreEntity } from '../../common/entities/common.entity';
import { Product } from '../../products/entities/product.entity';
import { User } from '../../users/entities/user.entity';

@InputType('LikeInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Like extends CoreEntity {
  @OneToOne(() => User, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  @Field((type) => User)
  createdBy: User;

  @ManyToMany(() => Product)
  @JoinTable()
  @Field((type) => [Product])
  products: Product[];
}
