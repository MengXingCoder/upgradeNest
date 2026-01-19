import { Controller, Get, Post, Body, Patch, Param, Delete, Version, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Read } from 'src/common/decorators/role-permission.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('cr')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create1(createUserDto);
  }


    @Get()
      @Read()
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
