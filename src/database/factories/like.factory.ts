import * as Faker from 'faker';
import { define } from 'typeorm-seeding';

import { Like } from '../../apis/likes/entities/likes.entity';

const likeFaker = async (faker: typeof Faker) => {
  const like = new Like();

  return like;
};

define<Promise<Like>, unknown>(Like, likeFaker);