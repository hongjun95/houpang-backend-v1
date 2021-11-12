import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrderItem } from '@apis/orders/entities/order-item.entity';
import { Product } from '@apis/products/entities/product.entity';
import { User } from '@apis/users/entities/user.entity';
import { Review } from '@apis/reviews/entities/review.entity';
import { ReviewsResolver } from '@apis/reviews/reviews.resolver';
import { ReviewsService } from '@apis/reviews/reviews.service';
import { ReviewsController } from '@apis/reviews/reviews.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Review, Product, OrderItem, User])],
  providers: [ReviewsResolver, ReviewsService],
  controllers: [ReviewsController],
})
export class ReviewsModule {}
