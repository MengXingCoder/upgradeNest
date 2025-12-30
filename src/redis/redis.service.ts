
import { Injectable, OnModuleDestroy } from '@nestjs/common';
import Redis from 'ioredis';
import { ConfigService } from '@nestjs/config';
import { redisConfigEnum } from 'src/enum/redis.enum';
@Injectable()
export class RedisService implements OnModuleDestroy {
  private client: Redis;

  constructor(private ConfigService:ConfigService) {
    this.client = new Redis({
      host: this.ConfigService.get(redisConfigEnum.REDIS_DB_HOST),
      port: this.ConfigService.get(redisConfigEnum.REDIS_DB_PORT),
    //   password: 'example',
      retryStrategy: () => 1000,
    });
  }

  getClient(): Redis {
    return this.client;
  }

  async onModuleDestroy() {
    await this.client.quit();
  }
}