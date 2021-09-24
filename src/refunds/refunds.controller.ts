import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { Roles } from 'src/auth/roles.decorator';
import { User } from 'src/users/entities/user.entity';
import { GetRefundsOutput } from './dtos/get-refunds.dto';
import {
  RefundProductInput,
  RefundProductOutput,
} from './dtos/refund-product.dto';
import { RefundsService } from './refunds.service';

@Controller('refunds')
export class RefundsController {
  constructor(private readonly refundsService: RefundsService) {}

  @Get('')
  @Roles(['Any'])
  async getRefunds(
    @Query('page') page, //
    @AuthUser() user: User,
  ): Promise<GetRefundsOutput> {
    return this.refundsService.getRefunds({ page }, user);
  }

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
