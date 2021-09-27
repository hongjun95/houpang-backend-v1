import { Product } from '../../apis/products/entities/product.entity';
import { Factory, Seeder } from 'typeorm-seeding';

export class CreateProducts implements Seeder {
  public async run(factory: Factory): Promise<void> {
    await factory(Product)().createMany(100);
  }
}
