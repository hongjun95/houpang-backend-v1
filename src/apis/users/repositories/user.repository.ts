import { EntityRepository, Repository } from 'typeorm';

import { User } from '@apis/users/entities/user.entity';
import { HttpException, HttpStatus } from '@nestjs/common';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser({
    email,
    username,
    password,
    language,
    phoneNumber,
    address,
    bio,
    userImg,
  }) {
    return await this.save(
      this.create({
        email,
        username,
        password,
        language,
        phoneNumber,
        address,
        bio,
        userImg,
      }),
    );
  }

  async findByEmail(email: string) {
    return this.findOne({ email });
  }

  async findByUsername(username: string) {
    return this.findOne({ username });
  }
}
