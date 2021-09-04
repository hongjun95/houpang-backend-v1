import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { Roles } from 'src/auth/roles.decorator';
import { User } from 'src/users/entities/user.entity';
import { CreateOrderInput, CreateOrderOutput } from './dtos/create-order.dto';
import { OrdersService } from './orders.service';

@Resolver()
export class OrdersResolver {
  constructor(private readonly ordersService: OrdersService) {}

  @Mutation((returns) => CreateOrderOutput)
  @Roles(['Consumer', 'Admin'])
  async createOrder(
    @Args('input') createOrderInput: CreateOrderInput,
    @AuthUser() consumer: User,
  ): Promise<CreateOrderOutput> {
    return this.ordersService.createOrder(createOrderInput, consumer);
  }
}
