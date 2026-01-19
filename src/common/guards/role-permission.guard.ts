import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Permission_Key } from 'src/common/decorators/role-permission.decorator';

@Injectable()
export class RolePermissionGuard implements CanActivate {
    constructor(private reflector:Reflector) { }
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
      const permissionHander = this.reflector.get<string>(Permission_Key, context.getHandler())
      const permissionClass = this.reflector.get<string>(Permission_Key, context.getClass())
      console.log('permissionHander', permissionHander)
       console.log('permissionClass',permissionClass)
    return true;
  }
}
