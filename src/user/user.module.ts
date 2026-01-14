import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserRepository } from './entities/user.repository';

@Module({
  imports:[TypeOrmModule.forFeature([User]),TypeOrmModule.forFeature([User],'mysql-a')],
  controllers: [UserController],
  providers: [UserService,UserRepository],
  exports:[UserService]
})
export class UserModule {}
