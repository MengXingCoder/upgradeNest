import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(private userService: UserService,
        private jwt:JwtService
    ) { }
    async login(loginUserDto) { 
        const { username,password} = loginUserDto
        const res = await this.userService.findUser(username)
        if (password !== res.password) { 
           throw new UnauthorizedException('用户名或密码错误');
        }
      console.log('查询 res--',res,res.id)
      return this.jwt.signAsync({
             sub: res.id,
            username:res.username
        })
    }
    register(registerUserDto) { 
        return this.userService.create(registerUserDto)
    }
}
