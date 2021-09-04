import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/products/entities/product';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateOrderInput, CreateOrderOutput } from './dtos/create-order.dto';
import {
  GetOrdersFromProviderInput,
  GetOrdersFromProviderOutput,
} from './dtos/get-orders-from-provider.dto';
import {
  GetOrdersFromConsumerInput,
  GetOrdersFromConsumerOutput,
} from './dtos/get-orders-from-consumer.dto';
import { OrderItem } from './entities/order-item.entity';
import { Order, OrderStatus } from './entities/order.entity';
import {
  FindOrderByIdInput,
  FindOrderByIdOutput,
} from './dtos/find-order-by-id.dto';
import {
  FindOrderItemByIdInput,
  FindOrderItemByIdOutput,
} from './dtos/find-order-item-by-id';
import { CancelOrderInput, CancelOrderOutput } from './dtos/cancel-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orders: Repository<Order>,

    @InjectRepository(OrderItem)
    private readonly orderItems: Repository<OrderItem>,

    @InjectRepository(Product)
    private readonly products: Repository<Product>,

    @InjectRepository(User)
    private readonly users: Repository<User>,
  ) {}

  async getOrdersFromConsumer({
    status,
    customerId,
  }: GetOrdersFromConsumerInput): Promise<GetOrdersFromConsumerOutput> {
    try {
      const consumer = await this.users.findOne(customerId);

      if (!consumer) {
        return {
          ok: false,
          error: '고객이 존재하지 않습니다.',
        };
      }

      const orders = await this.orders.find({
        where: {
          consumer,
          ...(status && { status }),
        },
        relations: [
          'orderItems',
          'orderItems.product',
          'orderItems.product.category',
          'orderItems.product.provider',
        ],
      });

      return {
        ok: true,
        orders,
      };
    } catch (error) {
      console.error(error);
      return {
        ok: false,
        error: '고객의 주문들을 가져올 수가 없습니다.',
      };
    }
  }

  async getOrdersFromProvider({
    status,
    providerId,
  }: GetOrdersFromProviderInput): Promise<GetOrdersFromProviderOutput> {
    try {
      const provider = await this.users.findOne(providerId);

      if (!provider) {
        return {
          ok: false,
          error: '공급자가 존재하지 않습니다.',
        };
      }

      const orderItems = await this.orderItems.find({
        where: {
          product: {
            provider,
          },
          order: {
            ...(status && { status }),
          },
        },
        relations: ['product', 'product.provider', 'product.category', 'order'],
        order: {
          createdAt: 'ASC',
        },
      });

      return {
        ok: true,
        orderItems,
      };
    } catch (error) {
      console.error(error);
      return {
        ok: false,
        error: '공급자에게 판매된 주문을 가져올 수가 없습니다.',
      };
    }
  }

  async findOrderById({
    orderId,
    consumerId,
  }: FindOrderByIdInput): Promise<FindOrderByIdOutput> {
    try {
      const consumer = await this.users.findOne(consumerId);

      if (!consumer) {
        return {
          ok: false,
          error: '고객이 존재하지 않습니다.',
        };
      }

      const order = await this.orders.findOne(orderId, {
        relations: [
          'orderItems',
          'orderItems.product',
          'orderItems.product.category',
          'orderItems.product.provider',
        ],
      });

      if (!order) {
        return {
          ok: false,
          error: '주문 ID에 해당하는 주문이 없습니다.',
        };
      }

      return {
        ok: true,
        order,
      };
    } catch (error) {
      console.error(error);
      return {
        ok: false,
        error: '해당 주문 ID 값의 주문을 가져올 수가 없습니다.',
      };
    }
  }

  async findOrderItemById({
    orderItemId,
    providerId,
  }: FindOrderItemByIdInput): Promise<FindOrderItemByIdOutput> {
    try {
      const provider = await this.users.findOne(providerId);

      if (!provider) {
        return {
          ok: false,
          error: '공급자가 존재하지 않습니다.',
        };
      }

      const orderItem = await this.orderItems.findOne(orderItemId, {
        relations: ['product', 'product.provider', 'product.category', 'order'],
      });

      if (!orderItem) {
        return {
          ok: false,
          error: '해당 품목에 대한 주문이 없습니다.',
        };
      }

      return {
        ok: true,
        orderItem,
      };
    } catch (error) {
      console.error(error);
      return {
        ok: false,
        error: '상품 품목들을 가져올 수 없습니다.',
      };
    }
  }

  async createOrder(
    { productIds }: CreateOrderInput,
    consumer: User,
  ): Promise<CreateOrderOutput> {
    try {
      let orderFinalPrice = 0;
      const orderItems: OrderItem[] = [];
      for (const productId of productIds) {
        const product = await this.products.findOne(productId);
        if (!product) {
          return {
            ok: false,
            error: '상품을 찾을 수가 없습니다.',
          };
        }
        let productFinalPrice = product.price;
        orderFinalPrice += productFinalPrice;

        const orderItem = await this.orderItems.save(
          this.orderItems.create({
            product,
          }),
        );
        orderItems.push(orderItem);
      }

      const order = await this.orders.save(
        this.orders.create({
          consumer,
          orderItems,
          total: orderFinalPrice,
          status: OrderStatus.Checking,
        }),
      );

      return {
        ok: true,
        orderId: order.id,
      };
    } catch (error) {
      console.error(error);
      return {
        ok: false,
        error: '주문을 하실 수가 없습니다.',
      };
    }
  }

  async cancelOrder(
    { orderId }: CancelOrderInput,
    consumer: User,
  ): Promise<CancelOrderOutput> {
    try {
      const order = await this.orders.findOne({
        where: {
          id: orderId,
          consumer,
        },
      });

      if (!order) {
        return {
          ok: false,
          error: '주문을 찾을 수가 없습니다.',
        };
      }

      if (order.status !== OrderStatus.Checking) {
        return {
          ok: false,
          error: '주문을 취소할 수 없습니다.',
        };
      }

      order.status = OrderStatus.Canceled;
      const newOrder = await this.orders.save(order);

      return {
        ok: true,
        order: newOrder,
      };
    } catch (error) {
      console.error(error);
      return {
        ok: false,
        error: '주문을 취소할 수 없습니다.',
      };
    }
  }
}
