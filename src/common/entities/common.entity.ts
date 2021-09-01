import { Field, ObjectType } from '@nestjs/graphql';
import { CreateDateColumn, PrimaryColumn, UpdateDateColumn } from 'typeorm';

@ObjectType()
export class CoreEntity {
  @PrimaryColumn()
  @Field((type) => Number)
  id: number;

  @CreateDateColumn()
  @Field((type) => Date)
  createdAt: Date;

  @UpdateDateColumn()
  @Field((type) => Date)
  updatedAt: Date;
}
