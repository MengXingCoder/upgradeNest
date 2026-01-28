import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { commonConfigModule } from './config/commonConfig.module';
import { mysqlDatabaseModule } from './commonModules/databaseModules/mysqlDB.modules';
import { RedisService } from './redis/redis.service';
import { mongoDatabaseModule } from './commonModules/databaseModules/mongoDB.modules ';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { RoleModule } from './role/role.module';
import { PermissionModule } from './permission/permission.module';
import { SeedModule } from './seed/seed.module';
import { SeedService } from './seed/seed.service';



@Module({
  imports: [commonConfigModule, mysqlDatabaseModule,mongoDatabaseModule, UserModule, AuthModule, RoleModule, PermissionModule, SeedModule],
  controllers: [AppController],
  providers: [RedisService,SeedService],
})
export class AppModule {
  constructor(private SeedService:SeedService) { }
    async onApplicationBootstrap() {
    console.log('🔧 [APP] onApplicationBootstrap 被调用'); // 👈 加日志
    if (process.env.NODE_ENV !== 'production') {
      await this.SeedService.seed();
    }
  }
}
