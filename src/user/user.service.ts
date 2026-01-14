import { Injectable, Version } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { version } from 'os';
import { UserRepository } from './entities/user.repository';

@Injectable()
export class UserService {

    constructor(
        // @InjectRepository(User) private userRepo: Repository<User>,
        // @InjectRepository(User, 'mysql-a') private userRepo1: Repository<User>,
    private userRepoCommon:UserRepository) { }
    create(createUserDto: CreateUserDto) {
        return 'This action adds a new user';
    }
   
    async findAllV1() {
      
        return await this.userRepoCommon.getRepository().find()
    }

    async findAllV2() {
    //   return 'This action adds a new user';  mysql-a
        return await this.userRepoCommon.getRepository().find()
    }

    findOne(id: number) {
        return `This action returns a #${id} user`;
    }

    update(id: number, updateUserDto: UpdateUserDto) {
        return `This action updates a #${id} user`;
    }

    remove(id: number) {
        return `This action removes a #${id} user`;
    }
}
