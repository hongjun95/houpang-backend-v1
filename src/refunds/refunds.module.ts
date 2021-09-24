import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RefundsService } from './refunds.service';
import { RefundsController } from './refunds.controller';
import { Refund } from './entities/refund.entity';
import { OrderItem } from 'src/orders/entities/order-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Refund, OrderItem])],
  providers: [RefundsService],
  controllers: [RefundsController],
})
export class RefundsModule {}
