import * as Faker from 'faker';
import { define } from 'typeorm-seeding';
import { getRepository } from 'typeorm';

import { Order } from '../../apis/orders/entities/order.entity';
import { User, UserRole } from '../../apis/users/entities/user.entity';
import { formmatDay } from '../../utils/dayUtils';

const orderFaker = async (faker: typeof Faker) => {
  const order = new Order();
  const userRepository = getRepository(User);
  const users = await userRepository.find({
    role: UserRole.Consumer,
  });

  order.consumer = faker.random.arrayElement(users);
  order.deliverRequest = faker.lorem.paragraph();
  order.destination = faker.address.city();
  order.orderedAt = formmatDay(new Date());
  order.total = faker.random.number();
  order.orderItems = [];

  return order;
};

define<Promise<Order>, unknown>(Order, orderFaker);
