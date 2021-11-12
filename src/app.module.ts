import { Module } from '@nestjs/common';
import { join } from 'path';

import { JwtModule } from '@jwt/jwt.module';
import { AuthModule } from '@auth/auth.module';
import { ProductsModule } from '@apis/products/products.module';
import { CategoriesModule } from '@apis/categories/categories.module';
import { OrdersModule } from '@apis/orders/orders.module';
import { ReviewsModule } from '@apis/reviews/reviews.module';
import { LikesModule } from '@apis/likes/likes.module';
import { UploadsModule } from '@apis/uploads/uploads.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { RefundsModule } from '@apis/refunds/refunds.module';
import { ConfigModule } from '@config/config.module';
import { DatabaseModule } from '@database/database.module';
import { GraphQLModule } from '@graphql/graphql.module';
import { CommonModule } from '@apis/common/common.module';
import { UsersModule } from '@apis/users/users.module';

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
