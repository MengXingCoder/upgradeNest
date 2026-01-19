import { SetMetadata } from "@nestjs/common"
import { Reflector } from "@nestjs/core";
import { Action } from "src/enum/actions.enum"



export const PERMISSION_KEY = 'permissions';

const accmulatemetadata = (key:string,permission:string):any => { 
    return (target: any, propertyKey?:any , descriptor?: TypedPropertyDescriptor<any>) => {
        const reflector = new Reflector()
        //针对于方法
        if (descriptor && descriptor.value) {
            const existPerm = reflector.get(key, descriptor.value) || []
            const newPerm = [...existPerm, permission]
            SetMetadata(key, newPerm)(target, propertyKey, descriptor)
        } else { //针对类
            const existPerm = reflector.get(key, target) || []
            const newPerm = [...existPerm, permission]
            SetMetadata(key,newPerm)(target)
        }
     }
}


export const Permission = (permission:string) =>accmulatemetadata(PERMISSION_KEY,permission)
export const Create = () => accmulatemetadata(PERMISSION_KEY, Action.Create.toLocaleLowerCase())
export const Delete = ()=>accmulatemetadata(PERMISSION_KEY,Action.Delete.toLocaleLowerCase())
export const Update = ()=>accmulatemetadata(PERMISSION_KEY,Action.Update.toLocaleLowerCase())
export const Read = ()=>accmulatemetadata(PERMISSION_KEY,Action.Read.toLocaleLowerCase())

// //定义接收多个参数的装饰器 
// export const Permission = (...permission:Action[]) =>SetMetadata(PERMISSION_KEY,permission)
