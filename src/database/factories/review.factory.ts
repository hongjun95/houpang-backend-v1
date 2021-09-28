import { define } from 'typeorm-seeding';
import * as Faker from 'faker';

import { Review } from '../../apis/reviews/entities/review.entity';

const reviewFaker = (faker: typeof Faker) => {
  const review = new Review();
  review.content = faker.lorem.paragraph();
  review.rating = faker.random.number({ min: 1, max: 5 });
  review.images = [
    `https:source.unsplash.com/5${faker.random.number({
      min: 10,
      max: 99,
    })}x601`,
    `https:source.unsplash.com/5${faker.random.number({
      min: 10,
      max: 99,
    })}x602`,
    `https:source.unsplash.com/5${faker.random.number({
      min: 10,
      max: 99,
    })}x603`,
  ];

  return review;
};

define(Review, reviewFaker);
