import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthUser } from '@auth/auth-user.decorator';
import { Roles } from '@auth/roles.decorator';
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
import { User } from '@apis/users/entities/user.entity';
import { UsersService } from '@apis/users/users.service';

@Resolver((of) => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query((returns) => User)
  @Roles(['Any'])
  me(@AuthUser() user: User): User {
    return user;
  }

  @Mutation((returns) => CreateAccountOutput)
  async createAccount(
    @Args('input') createAccountInput: CreateAccountInput,
  ): Promise<CreateAccountOutput> {
    return this.usersService.createAccount(createAccountInput);
  }

  @Mutation((returns) => LoginOutput)
  async login(@Args('input') loginInput: LoginInput): Promise<LoginOutput> {
    return this.usersService.login(loginInput);
  }

  @Mutation((returns) => EditProfileOutput)
  @Roles(['Any'])
  async editProfile(
    @Args('input') editProfileInput: EditProfileInput,
    @AuthUser() user: User,
  ): Promise<EditProfileOutput> {
    return this.usersService.editProfile(editProfileInput, user);
  }

  @Mutation((returns) => EditProfileOutput)
  @Roles(['Any'])
  async changePassword(
    @Args('input') ChangePasswordInput: ChangePasswordInput,
    @AuthUser() user: User,
  ): Promise<ChangePasswordOutput> {
    return this.usersService.changePassword(ChangePasswordInput, user.id);
  }

  @Mutation((returns) => UserProfileOutput)
  @Roles(['Any'])
  async userProfile(@AuthUser() user: User): Promise<UserProfileOutput> {
    return this.usersService.findUserById(user.id);
  }
}
