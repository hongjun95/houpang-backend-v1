import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
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
}
