import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { commonConfigModule } from './config/commonConfig.module';
import { DatabaseModule } from './commonModules/databaseModules/database.modules';


@Module({
  imports: [commonConfigModule,DatabaseModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
