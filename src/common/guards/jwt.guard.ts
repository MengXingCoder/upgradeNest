import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {
    constructor(private reflector:Reflector) {
        super()
     }
  canActivate(
    context: ExecutionContext,
  ):boolean|  Promise<boolean>|Observable<boolean>  {

//     context.getClass() → 获取整个 Controller 类
// context.getHandler() → 获取具体的 @Get(), @Post() 方法

//获取该controller上面的方法 读取其方法上对应的装饰器 来进行逻辑判断
      const isPublic = this.reflector.get<Boolean>('isPublic', context.getHandler())
      console.log('jwt gurads' ,context.getHandler(),context.getClass())
      if (isPublic) { return true} // 如果为真 那么就不见行校验直接放行
      return super.canActivate(context) //如果为假那就执行jwt的校验逻辑
  }
}
