import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like } from 'src/likes/entities/likes.entity';
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

    @InjectRepository(Like)
    private readonly likes: Repository<Like>,

    private readonly jwtService: JwtService,
  ) {}

  async createAccount({
    email,
    username,
    password,
    verifyPassword,
    language,
    phoneNumber,
    address,
    bio,
  }: CreateAccountInput): Promise<CreateAccountOutput> {
    try {
      const existedEmail = await this.users.findOne({ email });
      if (existedEmail) {
        return { ok: false, error: '계정이 있는 이메일입니다.' };
      }

      const existedUsername = await this.users.findOne({ username });
      if (existedUsername) {
        return { ok: false, error: '계정이 있는 이름입니다.' };
      }

      if (password !== verifyPassword) {
        return {
          ok: false,
          error: '비밀번호가 같지 않습니다.',
        };
      }

      const passwordRegex = new RegExp(
        /(?=.*[!@#$%^&\*\(\)_\+\-=\[\]\{\};\':\"\\\|,\.<>\/\?]+)(?=.*[a-zA-Z]+)(?=.*\d+)/,
      );

      const passwordTestPass = passwordRegex.test(password);

      if (!passwordTestPass) {
        return {
          ok: false,
          error: '비밀번호는 문자, 숫자, 특수문자를 1개 이상 포함해야 합니다.',
        };
      }

      const phoneNumberRegex = new RegExp(/^[0-9]{3}[-]+[0-9]{4}[-]+[0-9]{4}$/);
      const phoneNumberTestPass = phoneNumberRegex.test(phoneNumber);
      console.log(phoneNumberTestPass);

      if (!phoneNumberTestPass) {
        return {
          ok: false,
          error: '올바른 전화번호를 입력하세요',
        };
      }

      const user = await this.users.save(
        this.users.create({
          email,
          username,
          password,
          language,
          phoneNumber,
          address,
          bio,
        }),
      );

      await this.likes.save(
        this.likes.create({
          createdBy: user,
        }),
      );

      return { ok: true };
    } catch (e) {
      return { ok: false, error: '계정을 생성할 수 없습니다.' };
    }
  }

  async login({ email, password }: LoginInput): Promise<LoginOutput> {
    try {
      const user = await this.users.findOne({ email });

      if (!user) {
        return {
          ok: false,
          error: '사용자를 찾을 수 없습니다.',
        };
      }

      const passwordCorrect = await user.checkPassowrd(password);
      if (!passwordCorrect) {
        return {
          ok: false,
          error: '비밀번호가 틀렸습니다.',
        };
      }

      const token = this.jwtService.sign(user.id);

      return { ok: true, token };
    } catch (e) {
      return { ok: false, error: '계정을 생성할 수 없습니다.' };
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
    editProfileInput: EditProfileInput,
    userId: string,
  ): Promise<EditProfileOutput> {
    try {
      const user = await this.users.findOne(userId);

      if (editProfileInput.email) {
        const exists = await this.users.findOne({
          email: editProfileInput.email,
        });
        if (exists) {
          return {
            ok: false,
            error: '이미 존재하는 이메일로 수정할 수 없습니다.',
          };
        }
      }

      if (editProfileInput.username) {
        const exists = await this.users.findOne({
          username: editProfileInput.username,
        });
        if (exists) {
          return {
            ok: false,
            error: '이미 존재하는 사용자 이름으로 수정할 수 없습니다.',
          };
        }
      }

      const phoneNumberRegex = new RegExp(/^[0-9]{3}[-]+[0-9]{4}[-]+[0-9]{4}$/);

      if (!phoneNumberRegex) {
        return {
          ok: false,
          error: '올바른 전화번호를 입력하세요',
        };
      }

      await this.users.save({
        id: user.id,
        ...editProfileInput,
      });

      return {
        ok: true,
      };
    } catch (e) {
      console.error(e);
      return {
        ok: false,
        error: '사용자 프로파일을 수정할 수 없습니다.',
      };
    }
  }

  async changePassword(
    { currentPassword, newPassword, verifyPassword }: ChangePasswordInput,
    userId: string,
  ): Promise<ChangePasswordOutput> {
    try {
      if (newPassword !== verifyPassword) {
        return {
          ok: false,
          error: '비밀번호가 같지 않습니다.',
        };
      }

      const user = await this.users.findOne(userId);

      const passwordCorrect = await user.checkPassowrd(currentPassword);
      if (!passwordCorrect) {
        return {
          ok: false,
          error: '현재 비밀번호가 틀립니다.',
        };
      }

      if (currentPassword === newPassword) {
        return {
          ok: false,
          error: '새 비밀번호가 현재 비밀번호와 같습니다.',
        };
      }

      const regex = new RegExp(
        /(?=.*[!@#$%^&\*\(\)_\+\-=\[\]\{\};\':\"\\\|,\.<>\/\?]+)(?=.*[a-zA-Z]+)(?=.*\d+)/,
      );

      const passwordTestPass = regex.test(newPassword);

      if (!passwordTestPass) {
        return {
          ok: false,
          error: '비밀번호는 문자, 숫자, 특수문자를 1개 이상 포함해야 합니다.',
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
        error: '사용자 프로파일 수정할 수 없습니다.',
      };
    }
  }
}
