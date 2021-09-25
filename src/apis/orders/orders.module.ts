import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Product } from 'src/apis/products/entities/product.entity';
import { User } from 'src/apis/users/entities/user.entity';
import { OrderItem } from './entities/order-item.entity';
import { Order } from './entities/order.entity';
import { OrdersResolver } from './orders.resolver';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { Refund } from '../refunds/entities/refund.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, OrderItem, Product, User, Refund]),
  ],
  providers: [OrdersResolver, OrdersService],
  controllers: [OrdersController],
})
export class OrdersModule {}
