import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginUserDto } from './dto/login-user.dto';
import {registerUserDto} from './dto/register-user.dto'
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
    register(@Body() registerUserDto:registerUserDto) {
        return this.authService.register(registerUserDto)
     }
}
