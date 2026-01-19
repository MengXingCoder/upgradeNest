import { SetMetadata } from "@nestjs/common"
import { Action } from "src/enum/actions.enum"



export const Permission_Key = 'permission'

export const Permission = (permission:string) =>SetMetadata(Permission_Key,permission)
export const Create = () => SetMetadata(Permission_Key, Action.Create.toLocaleLowerCase())
export const Delete = ()=>SetMetadata(Permission_Key,Action.Delete.toLocaleLowerCase())
export const Update = ()=>SetMetadata(Permission_Key,Action.Update.toLocaleLowerCase())
export const Read = ()=>SetMetadata(Permission_Key,Action.Read.toLocaleLowerCase())