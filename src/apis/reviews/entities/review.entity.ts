import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { Column, Entity, ManyToOne, RelationId } from 'typeorm';

import { CoreEntity } from '../../common/entities/common.entity';
import { Product } from '../../products/entities/product.entity';
import { User } from '../../users/entities/user.entity';

@InputType('ReviewInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Review extends CoreEntity {
  @Field((type) => String)
  @IsString()
  @Column()
  content: string;

  @Field((type) => User)
  @ManyToOne((type) => User, (user) => user.reviews, {
    onDelete: 'CASCADE',
  })
  commenter: User;

  @RelationId((review: Review) => review.commenter)
  commenterId: string;

  @Field((type) => Product)
  @ManyToOne((type) => Product, (product) => product.reviews, {
    onDelete: 'CASCADE',
  })
  product: Product;

  @RelationId((review: Review) => review.product)
  productId: string;
}
