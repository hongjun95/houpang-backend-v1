import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderItem } from 'src/orders/entities/order-item.entity';
import { Order } from 'src/orders/entities/order.entity';
import { Product } from 'src/products/entities/product';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import {
  CreateReviewInput,
  CreateReviewOutput,
} from './dtos/create-review.dto';
import { Review } from './entities/review.entity';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private readonly reviews: Repository<Review>,

    @InjectRepository(Product)
    private readonly products: Repository<Product>,

    @InjectRepository(Order)
    private readonly orders: Repository<Order>,

    @InjectRepository(OrderItem)
    private readonly orderItems: Repository<OrderItem>,
  ) {}

  async createReview(
    { orderItemId, content }: CreateReviewInput,
    consumer: User,
  ): Promise<CreateReviewOutput> {
    try {
      const orderItem = await this.orderItems.findOne(orderItemId, {
        relations: ['product', 'order', 'order.consumer'],
      });

      if (!orderItem) {
        return {
          ok: false,
          error: '해당 상품을 주문하지 않았습니다.',
        };
      }

      if (consumer.id !== orderItem.order.consumer.id) {
        return {
          ok: false,
          error: '댓글을 다실 수가 없습니다.',
        };
      }

      const review = await this.reviews.save(
        this.reviews.create({
          commenter: consumer,
          content,
          product: orderItem.product,
        }),
      );

      return {
        ok: true,
        review,
      };
    } catch (error) {
      console.error(error);
      return {
        ok: false,
        error: '댓글을 다실 수가 없습니다.',
      };
    }
  }
}
