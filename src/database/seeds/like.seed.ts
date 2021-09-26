import * as Faker from 'faker';
import { getRepository } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';

import { Like } from '../../apis/likes/entities/likes.entity';
import { Product } from '../../apis/products/entities/product.entity';
import { User } from '../../apis/users/entities/user.entity';

export class CreateLikes implements Seeder {
  public async run(factory: Factory): Promise<void> {
    await factory(Like)()
      .map(async (like: Like) => {
        const user = await factory(User)().create();
        like.createdBy = user;

        const productRepository = getRepository(Product);
        const products = await productRepository.find();
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
        return like;
      })
      .createMany(10);
  }
}
