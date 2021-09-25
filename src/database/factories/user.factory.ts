import * as Faker from 'faker';

import { Language, User, UserRole } from '../../users/entities/user.entity';
import { define } from 'typeorm-seeding';

define(User, (faker: typeof Faker) => {
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
  user.userImg = 'https://source.unsplash.com/500x603/?woman';
  user.address = faker.address.streetAddress();

  return user;
});
