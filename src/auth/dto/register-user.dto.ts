import { IsNotEmpty, IsNumber, IsOptional, IsString, Length } from 'class-validator'
import { Transform } from 'class-transformer'

export class registerUserDto {
    @IsString()
    @IsNotEmpty()
    @Length(6, 20, {
        message: '用户名至少6位'
    })
    username: string;

    @IsString()
    @IsNotEmpty()
    @Length(6, 20, {
        message: '密码需要在6-20位'
    })
    password: string;

    @IsNotEmpty()
    @IsOptional()
    // @IsNumber({}, { each: true }) //第一种使用配置项 这个角色数组的每一项都必须是number类型的
    @Transform(({ value }) => value.map(o => parseInt(o))) //第二种循环解析 将 ['1',2,3] 解析为 [1,2,3]
    roles: number[]
}