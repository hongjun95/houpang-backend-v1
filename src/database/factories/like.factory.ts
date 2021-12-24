import Faker from 'faker';
import { define } from 'typeorm-seeding';

import { Like } from '@apis/likes/entities/likes.entity';

const likeFaker = (faker: typeof Faker) => {
  const like = new Like();

  return like;
};

define(Like, likeFaker);
