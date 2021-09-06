import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreEntity } from 'src/common/entities/common.entity';
import { Product } from 'src/products/entities/product';
import { User } from 'src/users/entities/user.entity';
import { Entity, JoinColumn, JoinTable, ManyToMany, OneToOne } from 'typeorm';

@InputType('FavListInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class FavList extends CoreEntity {
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
