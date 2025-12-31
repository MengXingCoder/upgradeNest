import * as Joi from 'joi'
import { mysqlValidationSchema } from './validation/mysql.validation'
import { mongoValidationSchema } from './validation/mongo.validation'
export const configValidationSchema = Joi.object({
    NODE_ENV: Joi.string().valid('production', 'development', 'test').default('development'),
    ...mysqlValidationSchema,
    ...mongoValidationSchema
})