import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { commonConfigModule } from './config/commonConfig.module';
import { mysqlDatabaseModule } from './commonModules/databaseModules/mysqlDB.modules';
import { RedisService } from './redis/redis.service';
import { mongoDatabaseModule } from './commonModules/databaseModules/mongoDB.modules ';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { RoleModule } from './role/role.module';




@Module({
  imports: [commonConfigModule, mysqlDatabaseModule,mongoDatabaseModule, UserModule, AuthModule, RoleModule],
  controllers: [AppController],
  providers: [RedisService],
})
export class AppModule {}
