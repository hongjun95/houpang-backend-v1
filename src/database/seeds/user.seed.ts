import { User } from '../../apis/users/entities/user.entity';
import { Factory, Seeder } from 'typeorm-seeding';

// like seeder를 이용하세요!!
// like seeder를 이용하면 user도 자동적으로 생성됩니다.

export class CreateUsers implements Seeder {
  public async run(factory: Factory): Promise<void> {
    await factory(User)().createMany(50);
  }
}
