import { Body, Controller, Get, Post, Query } from '@nestjs/common';

import { RedisService } from './redis/redis.service';
@Controller()
export class AppController {
    constructor(
      private redisService:RedisService
  ) {}

  @Get()
  async getHello(@Query('token') token:string ) {
      const redis = await this.redisService.getClient()
     
      console.log('redis', await redis.get('token'))
      const res = redis.get('token')
      await redis.set('token',token,'EX',60*10)  //设置过期时间 EX ->Expire   60*10  10分钟后过期
      return {
          token:res
      }
  }                            
    
    @Post()
  test(@Body() body: any) {
    console.log('In controller, body:', body);
    throw new Error('Test exception');
  } 
}
