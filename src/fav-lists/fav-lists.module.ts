import { Module } from '@nestjs/common';
import { FavListsService } from './fav-lists.service';
import { FavListsResolver } from './fav-lists.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavList } from './entities/favList.entity';
import { Product } from 'src/products/entities/product';

@Module({
  imports: [TypeOrmModule.forFeature([FavList, Product])],
  providers: [FavListsService, FavListsResolver],
})
export class FavListsModule {}
