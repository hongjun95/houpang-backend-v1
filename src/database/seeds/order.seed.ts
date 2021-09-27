import { Factory, Seeder } from 'typeorm-seeding';
import * as Faker from 'faker';

import { OrderItem } from '../../apis/orders/entities/order-item.entity';
import { Order } from '../../apis/orders/entities/order.entity';

export class CreateOrders implements Seeder {
  public async run(factory: Factory): Promise<void> {
    await factory(Order)()
      .map(async (order: Order) => {
        const orderItems = await factory(OrderItem)().createMany(
          Faker.random.number({ min: 1, max: 5 }),
        );

        order.orderItems = orderItems;
        return order;
      })
      .createMany(50);
  }
}
