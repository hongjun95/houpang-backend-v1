import { Controller, Get, Query, Post, Put, Param, Body } from '@nestjs/common';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { Roles } from 'src/auth/roles.decorator';
import { User } from 'src/users/entities/user.entity';
import {
  CreateReviewInput,
  CreateReviewOutput,
} from './dtos/create-review.dto';
import { EditReviewInput, EditReviewOutput } from './dtos/edit-review.dto';
import {
  GetReviewsOnConsumerInput,
  GetReviewsOnConsumerOutput,
} from './dtos/get-reviews-on-consumer.dto';
import {
  GetReviewsOnProductInput,
  GetReviewsOnProductOutput,
} from './dtos/get-reviews-on-products.dto';
import { ReviewsService } from './reviews.service';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Get('/product/:productId')
  @Roles(['Any'])
  async getReviewOnProduct(
    @Param() getReviewsOnProductInput: GetReviewsOnProductInput,
  ): Promise<GetReviewsOnProductOutput> {
    return this.reviewsService.getReviewsOnProduct(getReviewsOnProductInput);
  }

  @Get('/consumer/:consumerId')
  @Roles(['Any'])
  async getReviewOnConsumer(
    @Param() getReviewsOnConsumerInput: GetReviewsOnConsumerInput,
    @AuthUser() commenter: User,
  ): Promise<GetReviewsOnConsumerOutput> {
    return this.reviewsService.getReviewsOnConsumer(
      getReviewsOnConsumerInput,
      commenter,
    );
  }

  @Post('/orderItem/:orderItemId')
  @Roles(['Any'])
  async createReview(
    @Query('orderItemId') orderItemId: string,
    @Body() body: any,
    @AuthUser() commenter: User,
  ): Promise<CreateReviewOutput> {
    const createReviewInput: CreateReviewInput = {
      ...body,
      orderItemId,
    };
    return this.reviewsService.createReview(createReviewInput, commenter);
  }

  @Put('/:id')
  @Roles(['Any'])
  async editReview(
    @Param('id') id: string,
    @Body() body: any,
    @AuthUser() commenter: User,
  ): Promise<EditReviewOutput> {
    const editReviewInput: EditReviewInput = {
      ...body,
      id,
    };
    return this.reviewsService.editReview(editReviewInput, commenter);
  }
}
