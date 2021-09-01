import {
  Field,
  InputType,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { IsBoolean, IsEmail, IsEnum, IsString } from 'class-validator';
import { BeforeInsert, Column, Entity } from 'typeorm';
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

// const Language = createUnionType({
//   name: 'Language',
//   types: () => ['Korean', 'English'],
// });

registerEnumType(UserRole, { name: 'UserRole' });
registerEnumType(Language, { name: 'Language' });

@InputType()
@ObjectType()
@Entity()
export class User extends CoreEntity {
  // email, password, verified, role, lan, currency, bio, order, products

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
  async hashPassword(): Promise<void> {
    if (this.password) {
      try {
        this.password = await bcrypt.hash(this.password, 10);
      } catch (e) {
        console.log(e);
        throw new InternalServerErrorException();
      }
    }
  }
}
