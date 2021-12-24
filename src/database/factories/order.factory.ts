import Faker from 'faker';
import { define } from 'typeorm-seeding';

import { Order } from '@apis/orders/entities/order.entity';
import { formmatDay } from '@utils/dayUtils';

const orderFaker = (faker: typeof Faker) => {
  const order = new Order();
  const date = new Date();
  date.setDate(date.getDate() + faker.random.number({ min: -20, max: 20 }));

  order.deliverRequest = faker.lorem.paragraph();
  order.destination = faker.address.city();
  order.orderedAt = formmatDay(new Date());
  order.total = faker.random.number();
  order.orderItems = [];

  order.orderedAt = formmatDay(date);
  return order;
};

define(Order, orderFaker);
