import { Controller, Get, Post, Body, Patch, Param, Version, Query, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Delete, Permission, Read} from 'src/common/decorators/role-permission.decorator';
import { RolePermissionGuard } from 'src/common/guards/role-permission.guard';
import { Action } from 'src/enum/actions.enum';

@Controller('user')
    @UseGuards(RolePermissionGuard)
@Permission('user')
    @Permission('user1')

export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post('cr')

    create(@Body() createUserDto: CreateUserDto) {
        return this.userService.create1(createUserDto);
    }
    
    
  
    @Post('test')
    // @Permission(Action.Read,Action.Delete)
    @Read()
        @Delete()
       
    test() { 
        return 'test ok'
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

    
}
