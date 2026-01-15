import { Body, Controller, ParseArrayPipe, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginUserDto } from './dto/login-user.dto';
import {registerUserDto} from './dto/register-user.dto'
import { CreateUserPipe } from './pipes/create-user.pipe';
@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService) { }
    @Post('login')
    async login(@Body() loginUserDto:loginUserDto) { 
        const res = await this.authService.login(loginUserDto)
        console.log('登录res',res)
        return res
    }

    @Post('register')
        //@Body(new ParseArrayPipe({items:registerUserDto}) 可以通过自带的管道进行数据转换
        // @Body(CreateUserPipe) 第二种就是使用自定义的管道来进行转换
    register(@Body() registerUserDto:registerUserDto) {
        return this.authService.register(registerUserDto)
     }
}
