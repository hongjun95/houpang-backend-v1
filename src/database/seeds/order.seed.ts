import * as Faker from 'faker';
import { Factory, Seeder } from 'typeorm-seeding';
import { getRepository } from 'typeorm';

import {
  OrderItem,
  OrderStatus,
} from '../../apis/orders/entities/order-item.entity';
import { Order } from '../../apis/orders/entities/order.entity';
import { User, UserRole } from '../../apis/users/entities/user.entity';
import {
  Refund,
  RefundStatus,
} from '../../apis/refunds/entities/refund.entity';
import { Review } from '../../apis/reviews/entities/review.entity';

// Create order, orderItem, refund, review instance

export class CreateOrders implements Seeder {
  public async run(factory: Factory): Promise<void> {
    const userRepository = getRepository(User);
    const users = await userRepository.find({
      role: UserRole.Consumer,
    });

    await factory(Order)()
      .map(async (order: Order) => {
        const consumer = Faker.random.arrayElement(users);
        const orderItems = await factory(OrderItem)() //
          .map(async (orderItem: OrderItem) => {
            if (
              orderItem.status === OrderStatus.Exchanged ||
              orderItem.status === OrderStatus.Refunded
            ) {
              await factory(Refund)() //
                .map(async (refund: Refund) => {
                  const recallDay = new Date();
                  recallDay.setDate(recallDay.getDate() + 1);

                  refund.orderItem = orderItem;
                  refund.count = Faker.random.number({
                    min: 1,
                    max: orderItem.count,
                  });
                  refund.refundee = consumer;
                  refund.recallPlace = Faker.address.city();
                  refund.recallDay = recallDay;

                  if (orderItem.status === OrderStatus.Exchanged) {
                    refund.status = RefundStatus.Exchanged;
                    refund.sendPlace = Faker.address.city();
                    refund.sendDay = recallDay;
                  } else if (orderItem.status === OrderStatus.Refunded) {
                    refund.status = RefundStatus.Refunded;
                    refund.refundPay = orderItem.product.price * refund.count;
                  }

                  return refund;
                })
                .create();
            }
            orderItem.consumer = consumer;
            await factory(Review)() //
              .map(async (review: Review) => {
                review.commenter = consumer;
                review.product = orderItem.product;

                return review;
              })
              .create();
            return orderItem;
          })
          .createMany(Faker.random.number({ min: 1, max: 5 }));

        order.consumer = consumer;
        order.orderItems = orderItems;
        return order;
      })
      .createMany(100);
  }
}

export class CreateOrder implements Seeder {
  public async run(factory: Factory): Promise<void> {
    await factory(Order)()
      .map(async (order: Order) => {
        const orderItems = await factory(OrderItem)().createMany(
          Faker.random.number({ min: 1, max: 5 }),
        );

        order.orderItems = orderItems;
        return order;
      })
      .create();
  }
}
