import * as Joi from 'joi'
import { DatabaseValidationSchema } from './validation/database.validation'
export const configValidationSchema = Joi.object({
    NODE_ENV: Joi.string().valid('production', 'development', 'test').default('development'),
    ...DatabaseValidationSchema
})