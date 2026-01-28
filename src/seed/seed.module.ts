// src/seed/seed.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from '../entities/role.entity';
import { Permission } from '../entities/permission.entity';
// import { RolePermission } from '../entities/role-permission.entity';
import { SeedService } from './seed.service';
import { RoleModule } from '../role/role.module';
import { RolePermission } from 'src/entities/role.permission.entity';

@Module({
  imports: [
    RoleModule, // 包含 RolePermissionService
    TypeOrmModule.forFeature([Role, Permission,RolePermission]), // 显式注册
  ],
  providers: [SeedService],
  exports: [SeedService],
})
export class SeedModule {}
