import { Body, Controller, Get, Post, Query } from '@nestjs/common';

import { RedisService } from './redis/redis.service';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './mongo/mongo.service';
import { Model } from 'mongoose';
@Controller()
export class AppController {
    constructor(
        private redisService: RedisService,
        // @InjectModel(User.name) private userModel: Model<User> //mongo 第一种方式
         @InjectModel('User') private userModel: Model<User> //第二种
    ) { }

    //测试mongo
    @Get()
    async getHello() {
        return await this.userModel.find()
    }

    //测试redis
    //   @Get()
    //   async getHello(@Query('token') token:string ) {
    //       const redis = await this.redisService.getClient()

    //       console.log('redis', await redis.get('token'))
    //       const res = redis.get('token')
    //       await redis.set('token',token,'EX',60*10)  //设置过期时间 EX ->Expire   60*10  10分钟后过期
    //       return {
    //           token:res
    //       }
    //   }                            

    @Post()
    test(@Body() body: any) {
        console.log('In controller, body:', body);
        throw new Error('Test exception');
    }
}
