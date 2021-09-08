import { Module } from '@nestjs/common';
import { LikeResolver } from './likes.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/products/entities/product';
import { LikesController } from './likes.controller';
import { LikesService } from './likes.service';
import { Like } from './entities/likes.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Like, Product])],
  providers: [LikesService, LikeResolver],
  controllers: [LikesController],
})
export class LikesModule {}
