import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Product } from '@apis/products/entities/product.entity';
import { User } from '@apis/users/entities/user.entity';
import { OrderItem } from '@apis/orders/entities/order-item.entity';
import { Order } from '@apis/orders/entities/order.entity';
import { OrdersResolver } from '@apis/orders/orders.resolver';
import { OrdersService } from '@apis/orders/orders.service';
import { OrdersController } from '@apis/orders/orders.controller';
import { Refund } from '@apis/refunds/entities/refund.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, OrderItem, Product, User, Refund]),
  ],
  providers: [OrdersResolver, OrdersService],
  controllers: [OrdersController],
})
export class OrdersModule {}
