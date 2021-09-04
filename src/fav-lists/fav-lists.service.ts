import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/products/entities/product';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { LikeProductInput, LikeProductOutput } from './dtos/like-product.dto';
import { FavList } from './entities/favList.entity';

@Injectable()
export class FavListsService {
  constructor(
    @InjectRepository(FavList)
    private readonly favLists: Repository<FavList>,

    @InjectRepository(Product)
    private readonly products: Repository<Product>,
  ) {}

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

      const favList = await this.favLists.findOne({ createdBy: consumer });

      favList.products.push(product);

      await this.favLists.save(favList);

      return {
        ok: true,
      };
    } catch (error) {
      console.error(error);
      return {
        ok: false,
        error: '찜 할 수가 없습니다.',
      };
    }
  }
}
