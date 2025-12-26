import * as crypto from 'crypto';
(global as any).crypto = crypto;
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionFilter } from './common/filters/all-exception.filter';
import { ConfigService } from '@nestjs/config';
import { commonConfigEnum } from './enum/common.config.enum';
import { VersioningType } from '@nestjs/common';
async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService)
    //定义 errorFilterFlag 来判断是否开启全局过滤拦截
    const errorFilterFlag = configService.get<string>(commonConfigEnum.ERRORFILTER)
    if (errorFilterFlag) {
        const httpAdapter = app.get(HttpAdapterHost)
        app.useGlobalFilters(new AllExceptionFilter(httpAdapter))
    }
    //全局请求前缀
    const prefix = configService.get(commonConfigEnum.PREFIX, '/api')
    console.log('前缀',prefix)
    app.setGlobalPrefix(prefix)
    
    //跨域请求
    const cors = configService.get(commonConfigEnum.CORS,false)
    app.enableCors(cors)
    //接口版本控制  后续后缀就要加上/v1   比如 http://xxx.xxx.xx.xx:3000/api/v1
    const version = configService.get(commonConfigEnum.VERSION, '1')
    app.enableVersioning({
        type:VersioningType.URI,
        defaultVersion:[version]
    })

    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
