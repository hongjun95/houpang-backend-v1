import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Like } from '@apis/likes/entities/likes.entity';
import { User } from '@apis/users/entities/user.entity';
import { UsersResolver } from '@apis/users/users.resolver';
import { UsersService } from '@apis/users/users.service';
import { UsersController } from '@apis/users/users.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User, Like])],
  providers: [UsersResolver, UsersService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
