import { define } from 'typeorm-seeding';
import * as Faker from 'faker';

import {
  Language,
  User,
  UserRole,
} from '../../apis/users/entities/user.entity';

const userFaker = (faker: typeof Faker) => {
  const user = new User();
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();

  user.username = `${firstName} ${lastName}`;
  user.email = faker.internet.email();
  user.password = faker.internet.password();
  user.role = faker.random.objectElement<UserRole>(UserRole);
  user.language = faker.random.objectElement<Language>(Language);

  user.bio = faker.lorem.paragraph();
  user.phoneNumber = faker.phone.phoneNumber();
  user.userImg = `https:source.unsplash.com/6${faker.random.number({
    min: 10,
    max: 99,
  })}x603`;
  user.address = faker.address.streetAddress();

  return user;
};

define(User, userFaker);
