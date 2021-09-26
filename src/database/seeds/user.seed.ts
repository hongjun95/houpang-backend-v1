import { User } from '../../apis/users/entities/user.entity';
import { Factory, Seeder } from 'typeorm-seeding';

export class CreateUsers implements Seeder {
  public async run(factory: Factory): Promise<void> {
    await factory(User)().createMany(50);
  }
}
