import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { AuthUser } from '@auth/auth-user.decorator';
import { Roles } from '@auth/roles.decorator';
import { User } from '@apis/users/entities/user.entity';
import { FindLikeListOutput } from '@apis/likes/dtos/find-like-list.dto';
import {
  LikeProductInput,
  LikeProductOutput,
} from '@apis/likes/dtos/like-product.dto';
import {
  UnlikeProductInput,
  UnlikeProductOutput,
} from '@apis/likes/dtos/unlike-product.dto';
import { LikesService } from '@apis/likes/likes.service';

@Resolver()
export class LikeResolver {
  constructor(private readonly LikeService: LikesService) {}

  @Query((returns) => FindLikeListOutput)
  @Roles(['Consumer'])
  async findLikeList(@AuthUser() user: User): Promise<FindLikeListOutput> {
    return this.LikeService.findLikeList(user);
  }

  @Mutation((returns) => LikeProductOutput)
  @Roles(['Consumer'])
  async likeProduct(
    @Args('input') likeProductInput: LikeProductInput,
    @AuthUser() consumer: User,
  ): Promise<LikeProductOutput> {
    return this.LikeService.likeProduct(likeProductInput, consumer);
  }

  @Mutation((returns) => UnlikeProductOutput)
  @Roles(['Consumer'])
  async unlikeProduct(
    @Args('input') removeProductInput: UnlikeProductInput,
    @AuthUser() consumer: User,
  ): Promise<UnlikeProductOutput> {
    return this.LikeService.unlikeProduct(removeProductInput, consumer);
  }
}
