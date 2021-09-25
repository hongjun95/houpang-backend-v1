import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';
import { Category } from 'src/categories/entities/category.entity';
import { Like } from 'src/likes/entities/likes.entity';
import { OrderItem } from 'src/orders/entities/order-item.entity';
import { Order } from 'src/orders/entities/order.entity';
import { Product } from 'src/products/entities/product.entity';
import { Refund } from 'src/refunds/entities/refund.entity';
import { Review } from 'src/reviews/entities/review.entity';
import { User } from 'src/users/entities/user.entity';

export default () =>
  ({
    /*
  |--------------------------------------------------------------------------
  | Database Connection
  |--------------------------------------------------------------------------
  |
  | Here you may specify which of the database connections you wish
  | to use as your default connection for all database work.
  |
  */

    type: process.env.DB_DIALECT || 'postgres',
    ...(process.env.DATABASE_URL
      ? { url: process.env.DATABASE_URL }
      : {
          host: process.env.DB_HOST || 'localhost',
          port: parseInt(process.env.DB_PORT, 10) || 5432,
          username: process.env.DB_USERNAME || 'hongjun',
          password: process.env.DB_PASSWORD || '12345',
          database: process.env.DB_DATABASE || 'houpang-v1',
        }),
    logging: process.env.NODE_ENV !== 'prod' && process.env.NODE_ENV !== 'test',
    // entities: [join(__dirname, '../', '**/entities/*.entity.ts')],
    entities: [User, Product, Category, Order, OrderItem, Like, Review, Refund],
    migrations: [join(__dirname, '../', 'database/migrations/**/*.ts')],
    synchronize: process.env.NODE_ENV !== 'prod',
    dropSchema: process.env.DB_DROP_SCHEMA === 'true',
    migrationsRun: process.env.DB_MIGRATIONS_RUN === 'true',
  } as TypeOrmModuleOptions);
