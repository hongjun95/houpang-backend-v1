import * as Faker from 'faker';
import { define } from 'typeorm-seeding';
import { getRepository } from 'typeorm';

import {
  OrderItem,
  OrderStatus,
} from '@apis/orders/entities/order-item.entity';
import { Product } from '@apis/products/entities/product.entity';

const orderItemFaker = async (faker: typeof Faker) => {
  const orderItem = new OrderItem();
  const productRepository = getRepository(Product);
  const products = await productRepository.find();

  orderItem.count = faker.random.number({ min: 1, max: 100 });
  orderItem.product = faker.random.arrayElement(products);
  orderItem.status = faker.random.objectElement<OrderStatus>(OrderStatus);

  return orderItem;
};

define<Promise<OrderItem>, unknown>(OrderItem, orderItemFaker);
