import { BadRequestException, Injectable, NotFoundException, Version } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { version } from 'os';
import { UserRepository } from './entities/user.repository';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService {

    constructor(

        @InjectRepository(User) private userRepo1: Repository<User>,
    ) { }
    async create(createUserDto: CreateUserDto) {
        const { username, password } = createUserDto;

        // // 检查用户名是否已存在
        const existingUser = await this.findOne(username);
        console.log('existingUser', existingUser)
        if (existingUser) {
            throw new BadRequestException('Username already exists');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        // 直接保存到数据库中
        return await this.userRepo1.save({
            username,
            password: hashedPassword
        });


        //1、先create 创建实体对象 2、再通过save把实体对象保存到数据库中
        // const newUser = this.userRepo1.create({
        //     username,
        //     password
        // });
        // return await this.userRepo1.save(newUser);




    }
    async create1(createUserDto) {
        console.log('this.userRepo1', this.userRepo1)
        const { username, password } = createUserDto;

 const existingUser = await this.findOne(username);
        console.log('existingUser', existingUser)
        if (existingUser) {
            throw new BadRequestException('Username already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        // 直接保存到数据库中
        return await this.userRepo1.save({
            username,
            password: hashedPassword
        });







    }
    async findAll() {
        //   return 'This action adds a new user';  mysql-a
        // return await this.userRepoCommon.getRepository().find()
        return await this.userRepo1.find()
    }

    async findOne(username: string) {
        const res = await this.userRepo1.findOne({
            where: { username }
        })
        return res
    }

    async findUser(username: string) {
        const res = await this.userRepo1.findOne({
            where: { username }
        })
        if (!res) {
            throw new NotFoundException(`User "${username}" does not exist`);
        }
        console.log('userservice res', res)
        return res

    }

    update(id: number, updateUserDto: UpdateUserDto) {
        return `This action updates a #${id} user`;
    }

    remove(id: number) {
        return `This action removes a #${id} user`;
    }
}
