import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { PERMISSION_KEY } from 'src/common/decorators/role-permission.decorator';

@Injectable()
export class RolePermissionGuard implements CanActivate {
    constructor(private reflector:Reflector) { }
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    //   const permissionHander = this.reflector.getAllAndMerge<string[]>(PERMISSION_KEY, [context.getHandler(),context.getClass()])
      //   const permissionClass = this.reflector.get<string[]>(PERMISSION_KEY, context.getClass())
      
       const permissionHander = this.reflector.get<string>(PERMISSION_KEY, context.getHandler())
      const permissionClass = this.reflector.get<string>(PERMISSION_KEY, context.getClass())
      console.log('permissionHander', permissionHander)
       console.log('permissionClass',permissionClass)
    return true;
  }
}
