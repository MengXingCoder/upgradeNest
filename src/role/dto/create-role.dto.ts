import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateRoleDto {
    @IsNotEmpty()
    @IsString()
    name: string; // 如 "admin", "editor"
    @IsOptional()
    @IsString()
    description?: string;

}
