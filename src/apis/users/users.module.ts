import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersResolver } from '@apis/users/users.resolver';
import { UsersService } from '@apis/users/users.service';
import { UsersController } from '@apis/users/users.controller';
import { UserRepository } from '@apis/users/repositories/user.repository';
import { LikeRepository } from '../likes/repositories/like.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository, LikeRepository])],
  providers: [UsersResolver, UsersService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
