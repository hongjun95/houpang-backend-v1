import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

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

@Resolver()
export class ReviewsResolver {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Query((returns) => GetReviewsOnProductOutput)
  @Roles(['Any'])
  async getReviewOnProduct(
    @Args('input') getReviewsOnProductInput: GetReviewsOnProductInput,
  ): Promise<GetReviewsOnProductOutput> {
    return this.reviewsService.getReviewsOnProduct(getReviewsOnProductInput);
  }

  @Query((returns) => GetReviewsOnProductOutput)
  @Roles(['Any'])
  async getReviewOnConsumer(
    @Args('input') getReviewsOnConsumerInput: GetReviewsOnConsumerInput,
    @AuthUser() commenter: User,
  ): Promise<GetReviewsOnConsumerOutput> {
    return this.reviewsService.getReviewsOnConsumer(
      getReviewsOnConsumerInput,
      commenter,
    );
  }

  @Mutation((returns) => CreateReviewOutput)
  @Roles(['Any'])
  async createReview(
    @Args('input') createReviewInput: CreateReviewInput,
    @AuthUser() commenter: User,
  ): Promise<CreateReviewOutput> {
    return this.reviewsService.createReview(createReviewInput, commenter);
  }

  @Mutation((returns) => EditReviewOutput)
  @Roles(['Any'])
  async editReview(
    @Args('input') editReviewInput: EditReviewInput,
    @AuthUser() commenter: User,
  ): Promise<EditReviewOutput> {
    return this.reviewsService.editReview(editReviewInput, commenter);
  }

  @Mutation((returns) => DeleteReviewOutput)
  @Roles(['Any'])
  async deleteReview(
    @Args('input') deleteReviewInput: DeleteReviewInput,
    @AuthUser() commenter: User,
  ): Promise<DeleteReviewOutput> {
    return this.reviewsService.deleteReview(deleteReviewInput, commenter);
  }
}
