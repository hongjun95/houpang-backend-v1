import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { CoreEntity } from 'src/common/entities/common.entity';
import { Product } from 'src/products/entities/product.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, RelationId } from 'typeorm';

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
