import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavList } from 'src/fav-lists/entities/favList.entity';
import { User } from './entities/user.entity';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, FavList])],
  providers: [UsersResolver, UsersService],
  exports: [UsersService],
})
export class UsersModule {}
