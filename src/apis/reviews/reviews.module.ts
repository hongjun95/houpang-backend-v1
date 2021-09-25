import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrderItem } from 'src/apis/orders/entities/order-item.entity';
import { Product } from 'src/apis/products/entities/product.entity';
import { User } from 'src/apis/users/entities/user.entity';
import { Review } from './entities/review.entity';
import { ReviewsResolver } from './reviews.resolver';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Review, Product, OrderItem, User])],
  providers: [ReviewsResolver, ReviewsService],
  controllers: [ReviewsController],
})
export class ReviewsModule {}
