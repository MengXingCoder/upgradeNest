import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
    constructor(private userService: UserService,
        private jwt: JwtService,
        
    ) { }
    async login(loginUserDto) { 
        const { username,password} = loginUserDto
        const res = await this.userService.findUser(username)
        if (!bcrypt.compare(password, res.password)) { 
           throw new UnauthorizedException('用户名或密码错误');
        }
      console.log('查询 res--',res,res.id)
      return this.jwt.signAsync({
             sub: res.id,
            username:res.username
        })
    }
    register(registerUserDto) { 
        try {
            return this.userService.create(registerUserDto)
        } catch (error) {
             console.error('注册失败:', error); // 👈 看这里！打印真实错误
    throw new BadRequestException('注册失败，请检查输入');
        }
        
    }
}
