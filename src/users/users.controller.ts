import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { Roles } from 'src/auth/roles.decorator';
import { User } from 'src/users/entities/user.entity';
import {
  CreateAccountInput,
  CreateAccountOutput,
} from './dtos/create-account.dto';
import { LoginInput, LoginOutput } from './dtos/login.dto';
import { UsersService } from './users.service';

@Controller('/')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signup')
  async createAccount(
    @Body() body: CreateAccountInput,
  ): Promise<CreateAccountOutput> {
    return this.usersService.createAccount(body);
  }

  //   @Post()
  //   async login(
  //     @AuthUser() owner: User,
  //     @Param('restaurantId') id,
  //   ): Promise<LoginOutput> {
  //     const getStocksInput: LoginInput = {
  //       id,
  //     };
  //     return this.usersService.login(owner, getStocksInput);
  //   }
}
