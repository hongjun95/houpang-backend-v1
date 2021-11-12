import { Body, Controller, Get, Post, Res, UseFilters } from '@nestjs/common';
import { Response } from 'express';

import { AuthUser } from '@auth/auth-user.decorator';
import { Roles } from '@auth/roles.decorator';
import { User } from '@apis/users/entities/user.entity';
import {
  ChangePasswordInput,
  ChangePasswordOutput,
} from '@apis/users/dtos/change-password.dto';
import {
  CreateAccountInput,
  CreateAccountOutput,
} from '@apis/users/dtos/create-account.dto';
import {
  EditProfileInput,
  EditProfileOutput,
} from '@apis/users/dtos/edit-profile.dto';
import { LoginInput, LoginOutput } from '@apis/users/dtos/login.dto';
import { UserProfileOutput } from '@apis/users/dtos/user-profile.dto';
import { UsersService } from '@apis/users/users.service';

@Controller('')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/me')
  @Roles(['Any'])
  me(@AuthUser() user: User): User {
    return user;
  }

  @Post('/signup')
  async createAccount(@Body() body): Promise<CreateAccountOutput> {
    const createAccountInput: CreateAccountInput = {
      ...body,
    };
    return this.usersService.createAccount(createAccountInput);
  }

  @Post('/login')
  async login(
    @Body() body, //
    @Res({ passthrough: true }) res: Response,
  ): Promise<LoginOutput> {
    const loginInput: LoginInput = {
      ...body,
    };
    return this.usersService.login(loginInput, res);
  }

  @Post('/edit-profile')
  @Roles(['Any'])
  async editProfile(
    @Body() body,
    @AuthUser() user: User,
  ): Promise<EditProfileOutput> {
    const editProfileInput: EditProfileInput = {
      ...body,
    };
    return this.usersService.editProfile(editProfileInput, user);
  }

  @Post('/change-password')
  @Roles(['Any'])
  async changePassword(
    @Body() body,
    @AuthUser() user: User,
  ): Promise<ChangePasswordOutput> {
    const changePasswordOutput: ChangePasswordInput = {
      ...body,
    };
    return this.usersService.changePassword(changePasswordOutput, user.id);
  }

  @Post('/user-profile')
  @Roles(['Any'])
  async userProfile(@AuthUser() user: User): Promise<UserProfileOutput> {
    return this.usersService.findUserById(user.id);
  }

  @Get('/productsuser')
  @Roles(['Any'])
  async getProducts(@AuthUser() user: User) {
    return this.usersService.getProducts(user.id);
  }
}
