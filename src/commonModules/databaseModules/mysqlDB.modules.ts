import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { databaseConfigEnum } from 'src/enum/database.enum';
import { commonConfigModule } from 'src/config/commonConfig.module';  //导入配置模块
import { ConfigModule, ConfigService } from '@nestjs/config';




@Module({
    imports: [ConfigModule.forRoot({ isGlobal: true }),
        commonConfigModule,
    // 2. 配置 TypeORM
    TypeOrmModule.forRootAsync({
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
            type: configService.get<string>(databaseConfigEnum.DB_TYPE) || 'mysql',
            host: configService.get<string>(databaseConfigEnum.DB_HOST),
            port: configService.get<number>(databaseConfigEnum.DB_PORT),
            username: configService.get<string>(databaseConfigEnum.DB_USERNAME),
            password: configService.get<string>(databaseConfigEnum.DB_PASSWORD),
            database: configService.get<string>(databaseConfigEnum.DB_DATABASE),
            synchronize: configService.get<boolean>(databaseConfigEnum.DB_SYNC),
            entities: [],

        }),
    } as TypeOrmModuleOptions),
    ],
    exports: [TypeOrmModule], // 导出该模块，供其他模块能使用 TypeORM 功能 (增删改查)
})
export class mysqlDatabaseModule { }
