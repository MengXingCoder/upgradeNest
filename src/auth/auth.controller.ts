import { Body, Controller, Get, ParseArrayPipe, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginUserDto } from './dto/login-user.dto';
import { registerUserDto } from './dto/register-user.dto'
import { CreateUserPipe } from './pipes/create-user.pipe';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from 'src/common/guards/admin.guard';
import { isPublic } from 'src/common/decorators/public.decorator';
import { JwtGuard } from 'src/common/guards/jwt.guard';
@Controller('auth')
// @UseGuards(AdminGuard)
// @UseGuards(JwtGuard)
export class AuthController {
    constructor(private authService: AuthService) { }
    // @UseGuards(AuthGuard('jwt'),AdminGuard)

    // @UseGuards(AdminGuard)
    // @UseGuards(AuthGuard('jwt'))
    //多个装饰器时 执行时有顺序的 需要从下向上执行，就比如需要先执行(AuthGuard('jwt') 然后后面的AdminGuard才能获取到请求中的用户信息
    // @UseGuards(AuthGuard('jwt'),AdminGuard) 也可以合并起来写 就是执行顺序就是 从前往后执行
    @Get()
    // @isPublic()
    profile() {
        return '访问profile'
    }
    @Post('login')
    async login(@Body() loginUserDto: loginUserDto) {
        const res = await this.authService.login(loginUserDto)
        console.log('登录res', res)
        return { access_token: res }
    }

    @Post('register')
    //@Body(new ParseArrayPipe({items:registerUserDto}) 可以通过自带的管道进行数据转换
    // @Body(CreateUserPipe) 第二种就是使用自定义的管道来进行转换
    register(@Body() registerUserDto: registerUserDto) {
        return this.authService.register(registerUserDto)
    }
}
