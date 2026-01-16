import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { Repository } from "typeorm";
import { Inject } from "@nestjs/common";
import type { Request } from "express";
import { REQUEST } from "@nestjs/core";

export class UserRepository { 
    constructor(
        @InjectRepository(User) private userRepo: Repository<User>,
        @InjectRepository(User, 'mysql-a') private userRepo1: Repository<User>,
        //通过属性注入的方式 拿到全局的request对象
        @Inject(REQUEST) private request:Request
    ) { }


    getRepository() { 
        //根据用户请求传进来的参数来进行判断 请求访问那个数据库实例
        //通过request 来拿到请求数据
        // console.log(this.request)
        const { query } = this.request
        const { db } = query
       
        return this.userRepo1
    }
}