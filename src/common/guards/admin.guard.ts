import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AdminGuard implements CanActivate {
    constructor(
        private userService:UserService
    ) { }
 async canActivate(
    context: ExecutionContext,
  ):Promise<boolean>  {
      //获取请求信息
      const req = context.switchToHttp().getRequest()
      console.log('守卫获取用户信息', req.user)
     if (req.user) { 
         const { username} = req.user
         const res = await this.userService.findUser(username)
         console.log('adminguard user',res)
      }
    return true;
  }
}
