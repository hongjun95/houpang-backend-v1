import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { Roles } from 'src/auth/roles.decorator';
import { User } from 'src/users/entities/user.entity';
import { CreateOrderOutput } from './dtos/create-order.dto';
import {
  GetOrdersFromProviderInput,
  GetOrdersFromProviderOutput,
} from './dtos/get-orders-from-provider.dto';
import {
  GetOrdersFromConsumerInput,
  GetOrdersFromConsumerOutput,
} from './dtos/get-orders-from-consumer.dto';
import { OrdersService } from './orders.service';
import {
  FindOrderByIdInput,
  FindOrderByIdOutput,
} from './dtos/find-order-by-id.dto';
import {
  FindOrderItemByIdInput,
  FindOrderItemByIdOutput,
} from './dtos/find-order-item-by-id';
import { CancelOrderInput, CancelOrderOutput } from './dtos/cancel-order.dto';

@Controller('/orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get('/consumer')
  @Roles(['Consumer', 'Admin'])
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
  @Roles(['Consumer', 'Admin'])
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
    console.log('create-order');
    console.log(createOrderInput);
    return this.ordersService.createOrder(createOrderInput, consumer);
  }

  @Post('/:orderId')
  @Roles(['Any'])
  async cancelOrder(
    @Param() cancelOrderInput: CancelOrderInput,
    @AuthUser() consumer: User,
  ): Promise<CancelOrderOutput> {
    return this.ordersService.cancelOrder(cancelOrderInput, consumer);
  }
}
