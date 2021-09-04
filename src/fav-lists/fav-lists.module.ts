import { Module } from '@nestjs/common';
import { FavListsService } from './fav-lists.service';
import { FavListsResolver } from './fav-lists.resolver';

@Module({
  providers: [FavListsService, FavListsResolver]
})
export class FavListsModule {}
