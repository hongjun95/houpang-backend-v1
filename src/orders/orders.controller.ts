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
import {
  CancelOrderItemInput,
  CancelOrderItemOutput,
} from './dtos/cancel-order-item.dto';

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

  @Post('/order-item/:orderItemId')
  @Roles(['Any'])
  async cancelOrderItem(
    @Param() cancelOrderItemInput: CancelOrderItemInput,
    @AuthUser() consumer: User,
  ): Promise<CancelOrderItemOutput> {
    console.log(cancelOrderItemInput);
    return this.ordersService.cancelOrderItem(cancelOrderItemInput, consumer);
  }
}
