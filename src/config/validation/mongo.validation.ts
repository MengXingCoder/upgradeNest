import * as Joi from 'joi';

export const mongoValidationSchema = {
  MONGODB_URI: Joi.string()
    .uri({ scheme: ['mongodb', 'mongodb+srv'] })
    .required()
    .default('mongodb://localhost:27017/mongoDB'),
};