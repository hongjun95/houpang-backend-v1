import {
  Controller,
  Get,
  Post,
  Put,
  Param,
  Body,
  Delete,
  Query,
} from '@nestjs/common';
import { AuthUser } from '@auth/auth-user.decorator';
import { Roles } from '@auth/roles.decorator';
import { User } from '@apis/users/entities/user.entity';
import {
  CreateReviewInput,
  CreateReviewOutput,
} from '@apis/reviews/dtos/create-review.dto';
import {
  DeleteReviewInput,
  DeleteReviewOutput,
} from '@apis/reviews/dtos/delete-review.dto';
import {
  EditReviewInput,
  EditReviewOutput,
} from '@apis/reviews/dtos/edit-review.dto';
import {
  GetReviewsOnConsumerInput,
  GetReviewsOnConsumerOutput,
} from '@apis/reviews/dtos/get-reviews-on-consumer.dto';
import {
  GetReviewsOnProductInput,
  GetReviewsOnProductOutput,
} from '@apis/reviews/dtos/get-reviews-on-products.dto';
import { ReviewsService } from '@apis/reviews/reviews.service';

@Controller('/reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Get('/product/:productId')
  @Roles(['Any'])
  async getReviewOnProduct(
    @Param('productId') productId: string,
    @Query() query,
  ): Promise<GetReviewsOnProductOutput> {
    const getReviewsOnProductInput: GetReviewsOnProductInput = {
      productId,
      ...query,
    };
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

  @Post('/products/:productId')
  @Roles(['Any'])
  async createReview(
    @Param('productId') productId: string,
    @Body() body: any,
    @AuthUser() commenter: User,
  ): Promise<CreateReviewOutput> {
    const createReviewInput: CreateReviewInput = {
      ...body,
      productId,
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

  @Delete('/:reviewId')
  @Roles(['Any'])
  async deleteReview(
    @Param() deleteReviewInput: DeleteReviewInput,
    @AuthUser() commenter: User,
  ): Promise<DeleteReviewOutput> {
    return this.reviewsService.deleteReview(deleteReviewInput, commenter);
  }
}
