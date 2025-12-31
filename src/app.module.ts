import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { commonConfigModule } from './config/commonConfig.module';
import { mysqlDatabaseModule } from './commonModules/databaseModules/mysqlDB.modules';
import { RedisService } from './redis/redis.service';


@Module({
    imports: [commonConfigModule, mysqlDatabaseModule],
  controllers: [AppController],
  providers: [RedisService],
})
export class AppModule {}
