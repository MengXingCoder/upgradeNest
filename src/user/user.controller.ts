import { Controller, Get, Post, Body, Patch, Param, Delete, Version, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @Version('1')
  findAll1() {
      //也可以通过query参数带入的db名称来进行判断，但是很麻烦 可以抽离一个单独的数据库连接实例管理
    //   if (db === 'xxx') { }
      console.log('user ------------')
    return this.userService.findAllV1();
  }
  @Get()
  @Version('2')
  findAll() {
      //请求时带入query参数 db="mysql-a"
      console.log('user ------------mysql-a')
    return this.userService.findAllV2();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
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
