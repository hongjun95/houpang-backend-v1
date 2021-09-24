import { Body, Controller, Param, Post, Query } from '@nestjs/common';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { Roles } from 'src/auth/roles.decorator';
import { User } from 'src/users/entities/user.entity';
import {
  RefundProductInput,
  RefundProductOutput,
} from './dtos/refund-product.dto';
import { RefundsService } from './refunds.service';

@Controller('refunds')
export class RefundsController {
  constructor(private readonly refundsService: RefundsService) {}

  @Post('/order-item/:orderItemId/refund')
  @Roles(['Consumer', 'Admin'])
  async requestRefund(
    @Param('orderItemId') orderItemId: string,
    @Query('status') status,
    @Body() body,
    @AuthUser() user: User,
  ): Promise<RefundProductOutput> {
    const refundProductInput: RefundProductInput = {
      orderItemId,
      status,
      ...body,
    };
    return this.refundsService.requestRefund(refundProductInput, user);
  }
}
