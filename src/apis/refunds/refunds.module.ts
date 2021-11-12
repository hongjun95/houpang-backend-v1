import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RefundsService } from '@apis/refunds/refunds.service';
import { RefundsController } from '@apis/refunds/refunds.controller';
import { Refund } from '@apis/refunds/entities/refund.entity';
import { OrderItem } from '@apis/orders/entities/order-item.entity';
import { User } from '@apis/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Refund, OrderItem, User])],
  providers: [RefundsService],
  controllers: [RefundsController],
})
export class RefundsModule {}
