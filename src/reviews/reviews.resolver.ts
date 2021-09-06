import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { Roles } from 'src/auth/roles.decorator';
import { User } from 'src/users/entities/user.entity';
import {
  CreateReviewInput,
  CreateReviewOutput,
} from './dtos/create-review.dto';
import { ReviewsService } from './reviews.service';

@Resolver()
export class ReviewsResolver {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Mutation((returns) => CreateReviewOutput)
  @Roles(['Consumer', 'Admin'])
  async createReview(
    @Args('input') createReviewInput: CreateReviewInput,
    @AuthUser() consumer: User,
  ): Promise<CreateReviewOutput> {
    return this.reviewsService.createReview(createReviewInput, consumer);
  }
}
