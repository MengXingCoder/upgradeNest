import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi'
import { DatabaseValidationSchema } from './validation/database.validation'
const envFilePath = `.env.${process.env.NODE_ENV || `development`}`
@Module({
    imports: [ConfigModule.forRoot({
        isGlobal: true,
        envFilePath,
        validationSchema:Joi.object({
            NODE_ENV: Joi.string().valid('production', 'development', 'test').default('development'),
            ...DatabaseValidationSchema
        })
    })],
    providers:[ConfigService],
    exports:[ConfigService]
})
export class commonConfigModule {}
