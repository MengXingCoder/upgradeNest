import {  IsNotEmpty, IsString, Length } from 'class-validator'
export class loginUserDto {
    @IsString()
    @IsNotEmpty()
    @Length(6, 20)
    username: string;

    @IsString()
    @IsNotEmpty()
    @Length(6, 20)
    password: string;
}