import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';

export default () =>
  ({
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
    entities: ['dist/**/*.entity.js'],
    migrations: [join(__dirname, '../', 'database/migrations/**/*.ts')],
    synchronize: false,
    dropSchema: process.env.DB_DROP_SCHEMA === 'true',
    migrationsRun: process.env.DB_MIGRATIONS_RUN === 'true',
  } as TypeOrmModuleOptions);
