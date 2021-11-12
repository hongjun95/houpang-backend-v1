import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';

import { AuthUser } from '@auth/auth-user.decorator';
import { Roles } from '@auth/roles.decorator';
import { User } from '@apis/users/entities/user.entity';
import { CreateOrderOutput } from '@apis/orders/dtos/create-order.dto';
import {
  GetOrdersFromProviderInput,
  GetOrdersFromProviderOutput,
} from '@apis/orders/dtos/get-orders-from-provider.dto';
import {
  GetOrdersFromConsumerInput,
  GetOrdersFromConsumerOutput,
} from '@apis/orders/dtos/get-orders-from-consumer.dto';
import { OrdersService } from '@apis/orders/orders.service';
import {
  FindOrderByIdInput,
  FindOrderByIdOutput,
} from '@apis/orders/dtos/find-order-by-id.dto';
import {
  FindOrderItemByIdInput,
  FindOrderItemByIdOutput,
} from '@apis/orders/dtos/find-order-item-by-id';
import {
  CancelOrderItemInput,
  CancelOrderItemOutput,
} from '@apis/orders/dtos/cancel-order-item.dto';
import {
  UpdateOrerStatusInput,
  UpdateOrerStatusOutput,
} from '@apis/orders/dtos/update-order-status.dto';
import { OrderStatus } from '@apis/orders/entities/order-item.entity';

@Controller('/orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get('/consumer')
  @Roles(['Any'])
  async getOrdersFromConsumer(
    @Query() getOrdersInput: GetOrdersFromConsumerInput,
  ): Promise<GetOrdersFromConsumerOutput> {
    return this.ordersService.getOrdersFromConsumer(getOrdersInput);
  }

  @Get('/provider')
  @Roles(['Provider', 'Admin'])
  async getOrdersFromProvider(
    @Query() getOrdersFromProviderInput: GetOrdersFromProviderInput,
  ): Promise<GetOrdersFromProviderOutput> {
    return this.ordersService.getOrdersFromProvider(getOrdersFromProviderInput);
  }

  @Get('/:orderId')
  @Roles(['Any'])
  async findOrderById(
    @Param('orderId') orderId: string,
    @Query('consumerId') consumerId: string,
  ): Promise<FindOrderByIdOutput> {
    const findOrderByIdInput: FindOrderByIdInput = {
      consumerId,
      orderId,
    };
    return this.ordersService.findOrderById(findOrderByIdInput);
  }

  @Get('/:orderItemId')
  @Roles(['Provider', 'Admin'])
  async findOrderItemById(
    @Param('orderItemId') orderItemId: string,
    @Query('providerId') providerId: string,
  ): Promise<FindOrderItemByIdOutput> {
    const findOrderItemByIdInput: FindOrderItemByIdInput = {
      orderItemId,
      providerId,
    };
    return this.ordersService.findOrderItemById(findOrderItemByIdInput);
  }

  @Post('')
  @Roles(['Any'])
  async createOrder(
    @Body() createOrderInput,
    @AuthUser() consumer: User,
  ): Promise<CreateOrderOutput> {
    return this.ordersService.createOrder(createOrderInput, consumer);
  }

  @Put('/order-item/:orderItemId')
  @Roles(['Any'])
  async cancelOrderItem(
    @Param() cancelOrderItemInput: CancelOrderItemInput,
    @AuthUser() consumer: User,
  ): Promise<CancelOrderItemOutput> {
    return this.ordersService.cancelOrderItem(cancelOrderItemInput, consumer);
  }

  @Put('/order-item/:orderItemId/update')
  @Roles(['Provider', 'Admin'])
  async updateOrderStatus(
    @Param('orderItemId') orderItemId: string,
    @Query('orderStatus') orderStatus: OrderStatus,
    @AuthUser() user: User,
  ): Promise<UpdateOrerStatusOutput> {
    const updateOrerStatusInput: UpdateOrerStatusInput = {
      orderItemId,
      orderStatus,
    };
    return this.ordersService.updateOrderStatus(updateOrerStatusInput, user);
  }
}
