import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { CommonModule } from './common/common.module';

import { JwtModule } from './jwt/jwt.module';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { OrdersModule } from './orders/orders.module';
import { ReviewsModule } from './reviews/reviews.module';
import { LikesModule } from './likes/likes.module';
import { UploadsModule } from './uploads/uploads.module';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { RefundsModule } from './refunds/refunds.module';
import { ConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { GraphQLModule } from './graphql/graphql.module';

@Module({
  imports: [
    ConfigModule,
    GraphQLModule,
    DatabaseModule,
    JwtModule.forRoot({
      privateKey: process.env.PRIVATE_KEY,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    AuthModule,

    // apis
    CommonModule,
    UsersModule,
    ProductsModule,
    CategoriesModule,
    OrdersModule,
    LikesModule,
    ReviewsModule,
    UploadsModule,
    RefundsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
