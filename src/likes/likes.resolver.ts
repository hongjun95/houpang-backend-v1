import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { Roles } from 'src/auth/roles.decorator';
import { User } from 'src/users/entities/user.entity';
import {
  FindLikeListInput,
  FindLikeListOutput,
} from './dtos/find-like-list.dto';
import { LikeProductInput, LikeProductOutput } from './dtos/like-product.dto';
import {
  UnlikeProductInput,
  UnlikeProductOutput,
} from './dtos/unlike-product.dto';
import { LikesService } from './likes.service';

@Resolver()
export class LikeResolver {
  constructor(private readonly LikeService: LikesService) {}

  @Query((returns) => FindLikeListOutput)
  @Roles(['Consumer'])
  async findLikeList(
    @Args('input') findLikeListInput: FindLikeListInput,
  ): Promise<FindLikeListOutput> {
    return this.LikeService.findLikeList(findLikeListInput);
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
