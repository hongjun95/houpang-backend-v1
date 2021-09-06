import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { Roles } from 'src/auth/roles.decorator';
import { User } from 'src/users/entities/user.entity';
import {
  FindDipsListInput,
  FindDipsListOutput,
} from './dtos/find-dips-list.dto';
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

  @Query((returns) => FindDipsListOutput)
  @Roles(['Consumer'])
  async findDipsList(
    @Args('input') getDipsListInput: FindDipsListInput,
  ): Promise<FindDipsListOutput> {
    return this.favListsService.findDipsList(getDipsListInput);
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
