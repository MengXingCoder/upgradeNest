
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configValidationSchema } from './commonConfig.validation'
const envFilePath = `.env.${process.env.NODE_ENV || `development`}`
@Module({
    imports: [ConfigModule.forRoot({
        isGlobal: true,
        envFilePath,
        validationSchema:configValidationSchema
    })],
    providers:[ConfigService],
    exports:[ConfigService]
})
export class commonConfigModule {}
