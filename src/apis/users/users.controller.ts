import {
  Body,
  Controller,
  Get,
  Post,
  Res,
  UseInterceptors,
} from '@nestjs/common';
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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UndefinedToNullInterceptor } from '@interceptors/undefinedToNull.interceptor';

@ApiTags('users')
@UseInterceptors(UndefinedToNullInterceptor)
@Controller('')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Get user information' })
  @ApiResponse({
    status: 200,
    description: 'success',
    type: User,
  })
  @ApiResponse({
    status: 500,
    description: 'Server Error...',
  })
  @Get('/me')
  @Roles(['Any'])
  me(@AuthUser() user: User): User {
    return user;
  }

  @ApiOperation({ summary: 'Sign up' })
  @ApiResponse({
    status: 200,
    description: 'success',
    type: CreateAccountOutput,
  })
  @ApiResponse({
    status: 500,
    description: 'Server Error...',
  })
  @Post('/signup')
  async createAccount(
    @Body() body: CreateAccountInput,
  ): Promise<CreateAccountOutput> {
    const createAccountInput: CreateAccountInput = {
      ...body,
    };
    return this.usersService.createAccount(createAccountInput);
  }

  @ApiOperation({ summary: 'Login' })
  @ApiResponse({
    status: 200,
    description: 'success',
    type: LoginOutput,
  })
  @ApiResponse({
    status: 500,
    description: 'Server Error...',
  })
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
}
