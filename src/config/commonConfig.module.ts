import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
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
    })]
})
export class commonConfigModule {}
