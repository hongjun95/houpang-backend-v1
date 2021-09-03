import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from 'src/jwt/jwt.service';
import { Repository } from 'typeorm';
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
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly users: Repository<User>,

    private readonly jwtService: JwtService,
  ) {}

  async createAccount({
    email,
    password,
    language,
    bio,
  }: CreateAccountInput): Promise<CreateAccountOutput> {
    try {
      const exists = await this.users.findOne({ email });
      if (exists) {
        return { ok: false, error: 'There is a user with that email already' };
      }
      const user = await this.users.save(
        this.users.create({ email, password, language, bio }),
      );

      return { ok: true };
    } catch (e) {
      return { ok: false, error: "Couldn't create account" };
    }
  }

  async login({ email, password }: LoginInput): Promise<LoginOutput> {
    try {
      const user = await this.users.findOne({ email });

      if (!user) {
        return {
          ok: false,
          error: 'User not found',
        };
      }

      const passwordCorrect = await user.checkPassowrd(password);
      if (!passwordCorrect) {
        return {
          ok: false,
          error: 'Wrong password',
        };
      }

      const token = this.jwtService.sign(user.id);

      return { ok: true, token };
    } catch (e) {
      return { ok: false, error: "Couldn't create account" };
    }
  }

  async findUserById(id: string): Promise<UserProfileOutput> {
    try {
      const user = await this.users.findOne({ id });
      return {
        ok: true,
        user,
      };
    } catch (error) {
      console.error(error);
      return {
        ok: false,
        error: 'User not found',
      };
    }
  }

  async editProfile(
    { email, language, bio }: EditProfileInput,
    userId: string,
  ): Promise<EditProfileOutput> {
    try {
      const user = await this.users.findOne(userId);

      if (email) {
        const exists = await this.users.findOne({ email });
        if (exists) {
          return {
            ok: false,
            error: 'The email already exists',
          };
        }

        user.email = email;
      }
      if (language) {
        user.language = language;
      }
      if (bio) {
        user.bio = bio;
      }
      await this.users.save(user);

      return {
        ok: true,
      };
    } catch (e) {
      console.error(e);
      return {
        ok: false,
        error: "Can't edit user profile",
      };
    }
  }

  async changePassword(
    {
      password: currentPassword,
      newPassword,
      verifyPassword,
    }: ChangePasswordInput,
    userId: string,
  ): Promise<ChangePasswordOutput> {
    try {
      if (newPassword !== verifyPassword) {
        return {
          ok: false,
          error: 'Password does not match',
        };
      }

      const user = await this.users.findOne(userId);

      const passwordCorrect = await user.checkPassowrd(currentPassword);
      if (!passwordCorrect) {
        return {
          ok: false,
          error: 'Wrong current password',
        };
      }

      if (currentPassword === newPassword) {
        return {
          ok: false,
          error: 'The new password is same as current password',
        };
      }

      const regex = new RegExp(
        /(?=.*[!@#$%^&\*\(\)_\+\-=\[\]\{\};\':\"\\\|,\.<>\/\?]+)(?=.*[a-zA-Z]+)(?=.*\d+)/,
      );

      const passwordTestPass = regex.test(newPassword);

      if (!passwordTestPass) {
        return {
          ok: false,
          error: 'Password must contain special character, string and number',
        };
      }

      user.password = newPassword;

      await this.users.save(user);

      return {
        ok: true,
      };
    } catch (e) {
      console.error(e);
      return {
        ok: false,
        error: "Can't edit user profile",
      };
    }
  }
}
