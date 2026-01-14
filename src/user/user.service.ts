import { BadRequestException, Injectable, Version } from '@nestjs/common';
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
        @InjectRepository(User) private userRepo: Repository<User>,
        @InjectRepository(User, 'mysql-a') private userRepo1: Repository<User>,
        private userRepoCommon: UserRepository) { }
    async create(createUserDto) {
        const { username, password } = createUserDto;

        // 检查用户名是否已存在
        const existingUser = await this.userRepo1.findOne({ where: { username } });
        if (existingUser) {
            throw new BadRequestException('Username already exists');
        }
        const newUser = this.userRepo1.create({
            username,
            password
        });
        const savedUser = await this.userRepo1.save(newUser);
        return savedUser;
    }

    async findAll() {
        //   return 'This action adds a new user';  mysql-a
        // return await this.userRepoCommon.getRepository().find()
        return await this.userRepo1.find()
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
