import * as Joi from 'joi'
export const DatabaseValidationSchema = { 
  DB_TYPE: Joi.string().valid('mysql').required(),
  DB_HOST: Joi.string().ip().required(),
  DB_PORT: Joi.number().port().default(3306),
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_DATABASE: Joi.string().required(),
  DB_SYNC: Joi.boolean().default(false),
}