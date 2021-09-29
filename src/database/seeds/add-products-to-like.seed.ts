import * as Faker from 'faker';
import { getRepository } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';

import { Like } from '../../apis/likes/entities/likes.entity';
import { Product } from '../../apis/products/entities/product.entity';

export class AddProductsToLike implements Seeder {
  public async run(factory: Factory): Promise<void> {
    await factory(Like)()
      .map(async (like: Like) => {
        const likeRepository = getRepository(Like);
        const productRepository = getRepository(Product);
        const likes = await likeRepository.find();
        const products = await productRepository.find();

        for (const like of likes) {
          let pushedProducts: Product[] = [];
          products.forEach((product) => {
            const magicNumber = Faker.random.number({
              min: 0,
              max: 100,
            });
            if (magicNumber % 2 === 0) {
              pushedProducts.push(product);
            }
          });
          like.products = pushedProducts;
          await likeRepository.save(like);
        }

        return like;
      })
      .make();
  }
}
