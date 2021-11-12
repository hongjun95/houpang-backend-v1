import * as Faker from 'faker';
import { getRepository } from 'typeorm';
import { define } from 'typeorm-seeding';

import { Category } from '@apis/categories/entities/category.entity';
import { Product } from '@apis/products/entities/product.entity';
import { User, UserRole } from '@apis/users/entities/user.entity';

const productFaker = async (faker: typeof Faker) => {
  const product = new Product();
  const userRepository = getRepository(User);
  const categoryRepository = getRepository(Category);
  const users = await userRepository.find({
    role: UserRole.Provider,
  });
  const categories = await categoryRepository.find();
  const infos = [
    {
      id: Date.now() + faker.random.number(10),
      key: faker.commerce.product(),
      value: faker.random.word(),
    },
    {
      id: Date.now() + faker.random.number(10),
      key: faker.commerce.product(),
      value: faker.random.word(),
    },
    {
      id: Date.now() + faker.random.number(10),
      key: faker.commerce.product(),
      value: faker.random.word(),
    },
    {
      id: Date.now() + faker.random.number(10),
      key: faker.commerce.product(),
      value: faker.random.word(),
    },
  ];

  product.name = faker.commerce.productName();
  product.provider = faker.random.arrayElement(users);
  product.price = +faker.commerce.price(500, 1000000);
  product.stock = faker.random.number(3000);
  product.images = [
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
  product.category = faker.random.arrayElement(categories);
  product.infos = infos;

  return product;
};

define<Promise<Product>, unknown>(Product, productFaker);
