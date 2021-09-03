import {
  Field,
  InputType,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { IsBoolean, IsEmail, IsEnum, IsString } from 'class-validator';
import { BeforeInsert, BeforeUpdate, Column, Entity } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { CoreEntity } from 'src/common/entities/common.entity';
import { InternalServerErrorException } from '@nestjs/common';

export enum UserRole {
  Consumer = 'Consumer',
  Provider = 'Provider',
}

enum Language {
  Korean = 'Korean',
  English = 'English',
}

registerEnumType(UserRole, { name: 'UserRole' });
registerEnumType(Language, { name: 'Language' });

@InputType('UserInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class User extends CoreEntity {
  @Column({ unique: true })
  @Field((type) => String)
  @IsEmail()
  email: string;

  @Column()
  @Field((type) => String)
  @IsString()
  password: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.Consumer })
  @Field((type) => UserRole)
  @IsEnum(UserRole)
  role: UserRole;

  @Column({ default: false })
  @Field((type) => Boolean)
  @IsBoolean()
  verified: boolean;

  @Column({ default: Language.Korean })
  @Field((type) => Language)
  @IsEnum(Language)
  language: Language;

  @Column({ nullable: true })
  @Field((type) => String, { nullable: true })
  @IsString()
  bio?: string;

  //   @Column()
  //   @Field((type) => String)
  //   products: string;

  //   @Column()
  //   @Field((type) => String)
  //   orders: string;

  //   @Column()
  //   @Field((type) => String)
  //   favList: string;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(): Promise<void> {
    if (this.password) {
      try {
        this.password = await bcrypt.hash(this.password, 10);
      } catch (e) {
        console.error(e);
        throw new InternalServerErrorException();
      }
    }
  }

  async checkPassowrd(password: string): Promise<boolean> {
    try {
      const ok = await bcrypt.compare(password, this.password);
      return ok;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException();
    }
  }
}
