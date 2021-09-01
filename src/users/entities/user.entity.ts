import {
  createUnionType,
  Field,
  InputType,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { IsBoolean, IsEmail, IsEnum, IsString } from 'class-validator';
import { CoreEntity } from 'src/common/entities/common.entity';
import { Column, Entity } from 'typeorm';

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

  @Column({ type: 'enum', enum: UserRole })
  @Field((type) => UserRole)
  @IsEnum(UserRole)
  role: UserRole;

  @Column({ default: false })
  @Field((type) => Boolean)
  @IsBoolean()
  verified: boolean;

  @Column()
  @Field((type) => Language)
  @IsEnum(Language)
  language: Language;

  @Column()
  @Field((type) => String)
  @IsString()
  bio: string;

  //   @Column()
  //   @Field((type) => String)
  //   products: string;

  //   @Column()
  //   @Field((type) => String)
  //   orders: string;

  //   @Column()
  //   @Field((type) => String)
  //   favList: string;
}
