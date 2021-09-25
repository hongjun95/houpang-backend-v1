import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { UsersModule } from './users/users.module';
import { CommonModule } from './common/common.module';

import { JwtModule } from './jwt/jwt.module';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { OrdersModule } from './orders/orders.module';
import { ReviewsModule } from './reviews/reviews.module';
import { LikesModule } from './likes/likes.module';
import { TOKEN_KEY } from './common/common.constants';
import { UploadsModule } from './uploads/uploads.module';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { RefundsModule } from './refunds/refunds.module';
import { ConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ConfigModule,
    GraphQLModule.forRoot({
      playground: process.env.NODE_ENV !== 'production',
      autoSchemaFile: true,

      context: ({ req }) => {
        let token: string = '';
        let authorization: string = '';
        if (req.headers.hasOwnProperty(TOKEN_KEY)) {
          authorization = req.headers[TOKEN_KEY];
        }

        if (authorization.includes('Bearer')) {
          token = authorization.split(' ')[1];
        }

        return {
          token,
        };
      },
    }),
    DatabaseModule,
    JwtModule.forRoot({
      privateKey: process.env.PRIVATE_KEY,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),

    AuthModule,
    UsersModule,
    CommonModule,
    ProductsModule,
    CategoriesModule,
    OrdersModule,
    LikesModule,
    ReviewsModule,
    UploadsModule,
    RefundsModule,
    ConfigModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
