import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderItem, OrderStatus } from 'src/orders/entities/order-item.entity';
import { User, UserRole } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import {
  RefundProductInput,
  RefundProductOutput,
} from './dtos/refund-product.dto';
import { GetRefundsInput, GetRefundsOutput } from './dtos/get-refunds.dto';
import { Refund, RefundStatus } from './entities/refund.entity';

@Injectable()
export class RefundsService {
  constructor(
    @InjectRepository(Refund)
    private readonly refunds: Repository<Refund>,

    @InjectRepository(OrderItem)
    private readonly orderItems: Repository<OrderItem>,
  ) {}

  async requestRefund(
    refundProductInput: RefundProductInput,
    user: User,
  ): Promise<RefundProductOutput> {
    try {
      if (user.role !== UserRole.Consumer) {
        return {
          ok: false,
          error: '환불할 수 없습니다.',
        };
      }

      if (
        refundProductInput.status == RefundStatus.Exchanged &&
        refundProductInput.refundPay &&
        !!!refundProductInput.sendDay &&
        !!!refundProductInput.sendPlace
      ) {
        return {
          ok: false,
          error: '교환 신청을 하셨습니다.',
        };
      } else if (
        refundProductInput.status == RefundStatus.Refunded &&
        refundProductInput.sendDay &&
        refundProductInput.sendPlace &&
        !!!refundProductInput.refundPay
      ) {
        return {
          ok: false,
          error: '환불 신청을 하셨습니다.',
        };
      }

      const orderItem = await this.orderItems.findOne({
        where: {
          id: refundProductInput.orderItemId,
        },
      });

      if (!orderItem) {
        return {
          ok: false,
          error: '해당 품목에 대한 주문이 없습니다.',
        };
      }

      if (
        orderItem.status === OrderStatus.Exchanged ||
        orderItem.status === OrderStatus.Refunded
      ) {
        return {
          ok: false,
          error: '이미 교환이나 환불을 하셨습니다.',
        };
      }

      await this.refunds.save(
        this.refunds.create({
          ...refundProductInput,
          refundee: user,
          orderItem,
        }),
      );

      if (refundProductInput.status === RefundStatus.Exchanged) {
        orderItem.status = OrderStatus.Exchanged;
      } else if (refundProductInput.status === RefundStatus.Refunded) {
        orderItem.status = OrderStatus.Refunded;
      }

      await this.orderItems.save(orderItem);

      return {
        ok: true,
        orderItem,
      };
    } catch (error) {
      console.error(error);
      return {
        ok: false,
        error: '교환이나 환불을 할 수 없습니다.',
      };
    }
  }

  async getRefunds(
    { page }: GetRefundsInput,
    user: User,
  ): Promise<GetRefundsOutput> {
    try {
      const takePages = 10;
      const [refundItems, totalRefundItems] = await this.refunds.findAndCount({
        where: {
          refundee: user,
        },
        skip: (page - 1) * takePages,
        take: takePages,
        order: {
          createdAt: 'DESC',
        },
        relations: ['orderItem'],
      });
      return {
        ok: true,
        refundItems,
        totalPages: Math.ceil(totalRefundItems / takePages),
        totalResults: totalRefundItems,
      };
    } catch (error) {
      console.error(error);
      return {
        ok: false,
        error: '교환이나 환불된 주문 목록을 찾을 수가 없습니다.',
      };
    }
  }
}
