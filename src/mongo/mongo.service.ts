import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';


//第一种方式
// export type UserDocument = HydratedDocument<User>;

// @Schema()
// export class User {
//   @Prop()
//   name: string;

//     @Prop()
//     password: string;
// }

// export const mongoUserSchema = SchemaFactory.createForClass(User);


//第二种方式
// 1. 定义接口
export interface User extends Document {
  username: string;

  password: string;

  

}
export const mongoUserSchema = new mongoose.Schema({
    username: String,
    password: String
}, { collection: "users" })