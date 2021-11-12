import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';

import { AuthUser } from '@auth/auth-user.decorator';
import { Roles } from '@auth/roles.decorator';
import { User } from '@apis/users/entities/user.entity';
import {
  GetRefundsFromConsumerInput,
  GetRefundsFromConsumerOutput,
} from '@apis/refunds/dtos/get-refunds-from-consumer.dto';
import {
  GetRefundsFromProviderInput,
  GetRefundsFromProviderOutput,
} from '@apis/refunds/dtos/get-refunds-from-provider.dto';
import {
  RefundProductInput,
  RefundProductOutput,
} from '@apis/refunds/dtos/refund-product.dto';
import { RefundsService } from '@apis/refunds/refunds.service';

@Controller('refunds')
export class RefundsController {
  constructor(private readonly refundsService: RefundsService) {}

  @Get('/consumer')
  @Roles(['Any'])
  async getRefundsFromConsumer(
    @Query() GetRefundsFromConsumerInput: GetRefundsFromConsumerInput,
  ): Promise<GetRefundsFromConsumerOutput> {
    return this.refundsService.getRefundsFromConsumer(
      GetRefundsFromConsumerInput,
    );
  }

  @Get('/provider')
  @Roles(['Provider', 'Admin'])
  async getRefundsFromProvider(
    @Query() getRefundsFromProviderInput: GetRefundsFromProviderInput,
  ): Promise<GetRefundsFromProviderOutput> {
    return this.refundsService.getRefundsFromProvider(
      getRefundsFromProviderInput,
    );
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
