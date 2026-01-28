import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { Transform } from 'class-transformer';
export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @Length(4, 20, {
    message: '用户名至少6位',
  })
  username: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 20, {
    message: '密码需要在6-20位',
  })
  password: string;

  @IsArray()
  @IsOptional()
  roleIds: number[];
}
