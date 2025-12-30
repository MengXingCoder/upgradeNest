import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { commonConfigModule } from './config/commonConfig.module';
import { DatabaseModule } from './commonModules/databaseModules/database.modules';
import { RedisService } from './redis/redis.service';


@Module({
  imports: [commonConfigModule,DatabaseModule],
  controllers: [AppController],
  providers: [RedisService],
})
export class AppModule {}
