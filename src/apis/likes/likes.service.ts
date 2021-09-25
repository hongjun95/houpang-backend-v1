import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/apis/products/entities/product.entity';
import { User } from 'src/apis/users/entities/user.entity';
import { Repository } from 'typeorm';
import { FindLikeListOutput } from './dtos/find-like-list.dto';
import { LikeProductInput, LikeProductOutput } from './dtos/like-product.dto';
import {
  UnlikeProductInput,
  UnlikeProductOutput,
} from './dtos/unlike-product.dto';
import { Like } from './entities/likes.entity';

@Injectable()
export class LikesService {
  constructor(
    @InjectRepository(Like)
    private readonly Likes: Repository<Like>,

    @InjectRepository(Product)
    private readonly products: Repository<Product>,
  ) {}

  async findLikeList(user: User): Promise<FindLikeListOutput> {
    try {
      const likeList = await this.Likes.findOne({
        where: {
          createdBy: user,
        },
        relations: ['products'],
      });

      if (!likeList) {
        return {
          ok: false,
          error: '좋아요 목록을 찾을 수가 없습니다.',
        };
      }

      return {
        ok: true,
        likeList,
      };
    } catch (error) {
      console.error(error);
      return {
        ok: false,
        error: '좋아요 목록을 찾을 수가 없습니다.',
      };
    }
  }

  async likeProduct(
    { productId }: LikeProductInput,
    consumer: User,
  ): Promise<LikeProductOutput> {
    try {
      const product = await this.products.findOne(productId);

      if (!product) {
        return {
          ok: false,
          error: '해당 품목이 없습니다.',
        };
      }

      const like = await this.Likes.findOne({
        where: {
          createdBy: consumer,
        },
        relations: ['products'],
      });

      like.products = [...like.products, { ...product }];

      await this.Likes.save(like);

      return {
        ok: true,
      };
    } catch (error) {
      console.error(error);
      return {
        ok: false,
        error: '좋아요 목록에 담을 수가 없습니다.',
      };
    }
  }

  async unlikeProduct(
    { productId }: UnlikeProductInput,
    consumer: User,
  ): Promise<UnlikeProductOutput> {
    try {
      const product = await this.products.findOne(productId);

      if (!product) {
        return {
          ok: false,
          error: '해당 품목이 없습니다.',
        };
      }

      const favList = await this.Likes.findOne({
        where: {
          createdBy: consumer,
        },
        relations: ['products'],
      });

      favList.products = favList.products.filter(
        (aProduct) => aProduct.id !== product.id,
      );

      await this.Likes.save(favList);

      return {
        ok: true,
      };
    } catch (error) {
      console.error(error);
      return {
        ok: false,
        error: '좋아요 목록에서 뺄 수가 없습니다.',
      };
    }
  }
}
