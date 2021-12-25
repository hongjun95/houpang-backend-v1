import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Category } from '@src/apis/categories/entities/category.entity';
import { Like } from '@src/apis/likes/entities/likes.entity';
import { OrderItem } from '@src/apis/orders/entities/order-item.entity';
import { Order } from '@src/apis/orders/entities/order.entity';
import { Product } from '@src/apis/products/entities/product.entity';
import { Refund } from '@src/apis/refunds/entities/refund.entity';
import { Review } from '@src/apis/reviews/entities/review.entity';
import { User } from '@src/apis/users/entities/user.entity';

const config: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: false,
  logging: ['warn', 'error'],
  entities: [User, Product, Category, Order, OrderItem, Like, Refund, Review],
  migrations: ['dist/database/migrations/**/*.js'],
  cli: {
    entitiesDir: 'src/**/entities',
    migrationsDir: 'src/database/migrations',
  },
  // @ts-ignore
  seeds: ['src/database/seeds/**/*.ts'],
  factories: ['src/database/factories/**/*.ts'],
  baseUrl: './',
};

export = config;
