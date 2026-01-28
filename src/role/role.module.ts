import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from 'src/entities/role.entity';
import { RolePermissionService } from './role-permission.service';
import { RolePermission } from 'src/entities/role.permission.entity';
import { Permission } from 'src/entities/permission.entity';

@Module({
    imports:[TypeOrmModule.forFeature([Role,Permission,RolePermission])],
  controllers: [RoleController],
  providers: [RoleService,RolePermissionService],
  exports:[TypeOrmModule,RolePermissionService]
})
export class RoleModule {}
