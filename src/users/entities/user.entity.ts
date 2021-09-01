import { InputType, ObjectType } from '@nestjs/graphql';
import { Entity } from 'typeorm';

@InputType()
@ObjectType()
@Entity()
export class User {}
