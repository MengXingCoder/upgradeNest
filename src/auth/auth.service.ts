import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor( private userService:UserService) { }
    login(loginUserDto) { 
     return   this.userService.findAll()
    }
    register(registerUserDto) { 
        return this.userService.create(registerUserDto)
    }
}
