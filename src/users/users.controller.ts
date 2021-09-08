import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { Roles } from 'src/auth/roles.decorator';
import { User } from 'src/users/entities/user.entity';
import {
  ChangePasswordInput,
  ChangePasswordOutput,
} from './dtos/change-password.dto';
import {
  CreateAccountInput,
  CreateAccountOutput,
} from './dtos/create-account.dto';
import { EditProfileInput, EditProfileOutput } from './dtos/edit-profile.dto';
import { LoginInput, LoginOutput } from './dtos/login.dto';
import { UserProfileOutput } from './dtos/user-profile.dto';
import { UsersService } from './users.service';

@Controller('/')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  @Roles(['Any'])
  me(@AuthUser() user: User): User {
    return user;
  }

  @Post('signup')
  async createAccount(
    @Body() body: CreateAccountInput,
  ): Promise<CreateAccountOutput> {
    return this.usersService.createAccount(body);
  }

  @Post('login')
  async login(@Body() body: LoginInput): Promise<LoginOutput> {
    return this.usersService.login(body);
  }

  @Post('edit-profile')
  @Roles(['Any'])
  async editProfile(
    @Body() body: EditProfileInput,
    @AuthUser() user: User,
  ): Promise<EditProfileOutput> {
    return this.usersService.editProfile(body, user.id);
  }

  @Post('change-password')
  @Roles(['Any'])
  async changePassword(
    @Body() ChangePasswordInput: ChangePasswordInput,
    @AuthUser() user: User,
  ): Promise<ChangePasswordOutput> {
    return this.usersService.changePassword(ChangePasswordInput, user.id);
  }

  @Post('user-profile')
  @Roles(['Any'])
  async userProfile(@AuthUser() user: User): Promise<UserProfileOutput> {
    return this.usersService.findUserById(user.id);
  }
}
