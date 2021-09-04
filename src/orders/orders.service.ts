import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/products/entities/product';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateOrderInput, CreateOrderOutput } from './dtos/create-order.dto';
import { OrderItem } from './entities/order-item.entity';
import { Order, OrderStatus } from './entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orders: Repository<Order>,

    @InjectRepository(OrderItem)
    private readonly orderItems: Repository<OrderItem>,

    @InjectRepository(Product)
    private readonly products: Repository<Product>,
  ) {}

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
}
