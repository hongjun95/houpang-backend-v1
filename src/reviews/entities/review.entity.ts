import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { CoreEntity } from 'src/common/entities/common.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, RelationId } from 'typeorm';

@InputType('ReviewInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Review extends CoreEntity {
  @Field((type) => String)
  @IsString()
  @Column()
  comment: string;

  @Field((type) => User)
  @ManyToOne((type) => User, (user) => user.reviews, {
    onDelete: 'CASCADE',
  })
  commenter: User;

  @RelationId((review: Review) => review.commenter)
  commenterId: number;
}
