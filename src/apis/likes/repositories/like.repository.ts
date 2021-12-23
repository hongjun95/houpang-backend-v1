import { EntityRepository, Repository } from 'typeorm';

import { Like } from '@apis/likes/entities/likes.entity';
import { User } from '@apis/users/entities/user.entity';

@EntityRepository(Like)
export class LikeRepository extends Repository<Like> {
  async createLike(user: User) {
    return await this.save(
      this.create({
        createdBy: user,
      }),
    );
  }
}
