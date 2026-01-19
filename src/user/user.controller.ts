import { Controller, Get, Post, Body, Patch, Param, Delete, Version, Query, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Read } from 'src/common/decorators/role-permission.decorator';
import { RolePermissionGuard } from 'src/common/guards/role-permission.guard';

@Controller('user')
// @UseGuards(RolePermissionGuard)
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post('cr')
// @Read()
//     @Delete()
    create(@Body() createUserDto: CreateUserDto) {
        return this.userService.create1(createUserDto);
    }


    @Get()
    
    findAll() {
        //请求时带入query参数 db="mysql-a"
        console.log('user ------------mysql-a 租户a的数据库')
        return this.userService.findAll();
    }



    @Patch(':id')
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.userService.update(+id, updateUserDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.userService.remove(+id);
    }
}
