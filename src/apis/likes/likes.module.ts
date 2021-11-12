import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Product } from '@apis/products/entities/product.entity';
import { LikeResolver } from '@apis/likes/likes.resolver';
import { LikesController } from '@apis/likes/likes.controller';
import { LikesService } from '@apis/likes/likes.service';
import { Like } from '@apis/likes/entities/likes.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Like, Product])],
  providers: [LikesService, LikeResolver],
  controllers: [LikesController],
})
export class LikesModule {}
