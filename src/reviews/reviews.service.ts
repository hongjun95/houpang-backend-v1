import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderItem } from 'src/orders/entities/order-item.entity';
import { Order } from 'src/orders/entities/order.entity';
import { Product } from 'src/products/entities/product';
import { User, UserRole } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import {
  CreateReviewInput,
  CreateReviewOutput,
} from './dtos/create-review.dto';
import {
  GetReviewsOnConsumerInput,
  GetReviewsOnConsumerOutput,
} from './dtos/get-reviews-on-consumer.dto';
import {
  GetReviewsOnProductInput,
  GetReviewsOnProductOutput,
} from './dtos/get-reviews-on-products.dto';
import { Review } from './entities/review.entity';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private readonly reviews: Repository<Review>,

    @InjectRepository(Product)
    private readonly products: Repository<Product>,

    @InjectRepository(OrderItem)
    private readonly orderItems: Repository<OrderItem>,

    @InjectRepository(User)
    private readonly users: Repository<User>,
  ) {}

  async getReviewsOnProduct({
    productId,
  }: GetReviewsOnProductInput): Promise<GetReviewsOnProductOutput> {
    try {
      const product = await this.products.findOne(productId, {
        relations: ['reviews', 'reviews.commenter'],
      });

      if (!product) {
        return {
          ok: false,
          error: '해당 상품이 없습니다.',
        };
      }

      const reviews: Review[] = product.reviews;

      return {
        ok: true,
        reviews,
      };
    } catch (error) {
      console.error(error);
      return {
        ok: false,
        error: '상품에 대한 댓글을 보실 수가 없습니다.',
      };
    }
  }

  async getReviewsOnConsumer(
    { consumerId }: GetReviewsOnConsumerInput,
    user: User,
  ): Promise<GetReviewsOnConsumerOutput> {
    try {
      const consumer = await this.users.findOne(consumerId, {
        relations: ['reviews', 'reviews.product'],
      });

      if (user.id !== consumer.id || user.role !== UserRole.Admin) {
        return {
          ok: false,
          error: '사용자의 댓글 목록을 보실 수 없습니다.',
        };
      }

      const reviews: Review[] = consumer.reviews;

      return {
        ok: true,
        reviews,
      };
    } catch (error) {
      console.error(error);
      return {
        ok: false,
        error: '사용자의 댓글 목록을 보실 수 없습니다.',
      };
    }
  }

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
