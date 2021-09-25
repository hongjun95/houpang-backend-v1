import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { AuthUser } from 'src/auth/auth-user.decorator';
import { Roles } from 'src/auth/roles.decorator';
import { User } from 'src/apis/users/entities/user.entity';
import { CreateOrderInput, CreateOrderOutput } from './dtos/create-order.dto';
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

@Resolver()
export class OrdersResolver {
  constructor(private readonly ordersService: OrdersService) {}

  @Query((returns) => GetOrdersFromConsumerOutput)
  @Roles(['Any'])
  async getOrdersFromConsumer(
    @Args('input') getOrdersInput: GetOrdersFromConsumerInput,
  ): Promise<GetOrdersFromConsumerOutput> {
    return this.ordersService.getOrdersFromConsumer(getOrdersInput);
  }

  @Query((returns) => GetOrdersFromProviderOutput)
  @Roles(['Provider', 'Admin'])
  async getOrdersFromProvider(
    @Args('input') getOrdersFromProviderInput: GetOrdersFromProviderInput,
  ): Promise<GetOrdersFromProviderOutput> {
    return this.ordersService.getOrdersFromProvider(getOrdersFromProviderInput);
  }

  @Query((returns) => FindOrderByIdOutput)
  @Roles(['Any'])
  async findOrderById(
    @Args('input') findOrderByIdInput: FindOrderByIdInput,
  ): Promise<FindOrderByIdOutput> {
    return this.ordersService.findOrderById(findOrderByIdInput);
  }

  @Query((returns) => FindOrderItemByIdOutput)
  @Roles(['Provider', 'Admin'])
  async findOrderItemById(
    @Args('input') findOrderItemByIdInput: FindOrderItemByIdInput,
  ): Promise<FindOrderItemByIdOutput> {
    return this.ordersService.findOrderItemById(findOrderItemByIdInput);
  }

  @Mutation((returns) => CreateOrderOutput)
  @Roles(['Any'])
  async createOrder(
    @Args('input') createOrderInput: CreateOrderInput,
    @AuthUser() consumer: User,
  ): Promise<CreateOrderOutput> {
    return this.ordersService.createOrder(createOrderInput, consumer);
  }

  @Mutation((returns) => CancelOrderItemOutput)
  @Roles(['Any'])
  async cancelOrderItem(
    @Args('input') cancelOrderItemInput: CancelOrderItemInput,
    @AuthUser() consumer: User,
  ): Promise<CancelOrderItemOutput> {
    return this.ordersService.cancelOrderItem(cancelOrderItemInput, consumer);
  }
}
