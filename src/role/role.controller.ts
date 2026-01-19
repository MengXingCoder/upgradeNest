import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { optional } from 'joi';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }

  @Get()
  findAll(@Query('page', new ParseIntPipe({ optional: true })) page: number,
      @Query('limit', new ParseIntPipe({ optional: true })) limit:number) {
    return this.roleService.findAll(page,limit);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.roleService.findOne(id);
  }

    @Patch(':id')
    //   http://47.111.171.128:3000/api/v1/role/2      下面的body 传入 { "name":"xxxx","description":"xxxx"}
  update(@Param('id') id: number, @Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.update(id, updateRoleDto);
  }

    @Delete(':id')
    //   http://47.111.171.128:3000/api/v1/role/1
  remove(@Param('id') id: number) {
    return this.roleService.remove(+id);
  }
}
