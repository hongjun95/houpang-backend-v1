import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { Roles } from 'src/auth/roles.decorator';
import { User } from 'src/users/entities/user.entity';
import { FindFavListInput, FindFavListOutput } from './dtos/find-fav-list.dto';
import {
  DipsOnProductInput,
  DipsOnProductOutput,
} from './dtos/dips-on-product.dto';
import {
  RemoveProductInput,
  RemoveProductOutput,
} from './dtos/remove-product.dto';
import { FavListsService } from './fav-lists.service';

@Resolver()
export class FavListsResolver {
  constructor(private readonly favListsService: FavListsService) {}

  @Query((returns) => FindFavListOutput)
  @Roles(['Consumer'])
  async findFavList(
    @Args('input') getFavListInput: FindFavListInput,
  ): Promise<FindFavListOutput> {
    return this.favListsService.findFavList(getFavListInput);
  }

  @Mutation((returns) => DipsOnProductOutput)
  @Roles(['Consumer'])
  async dipsOnProduct(
    @Args('input') dipsOnProductInput: DipsOnProductInput,
    @AuthUser() consumer: User,
  ): Promise<DipsOnProductOutput> {
    return this.favListsService.dipsOnProduct(dipsOnProductInput, consumer);
  }

  @Mutation((returns) => RemoveProductOutput)
  @Roles(['Consumer'])
  async removeProduct(
    @Args('input') removeProductInput: RemoveProductInput,
    @AuthUser() consumer: User,
  ): Promise<RemoveProductOutput> {
    return this.favListsService.removeProduct(removeProductInput, consumer);
  }
}
