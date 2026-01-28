// src/role/role-permission.service.ts
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource, In } from 'typeorm';
import { Role } from '../entities/role.entity';
import { Permission } from '../entities/permission.entity';
import { RolePermission } from 'src/entities/role.permission.entity';

@Injectable()
export class RolePermissionService {
  constructor(
    @InjectRepository(Role)
    private roleRepo: Repository<Role>,
    @InjectRepository(Permission)
    private permRepo: Repository<Permission>,
    @InjectRepository(RolePermission)
    private rolePermRepo: Repository<RolePermission>,
    private dataSource: DataSource,
  ) {}

  /**
   * 为角色批量设置权限（覆盖式）
   * 例如：setPermissionsForRole(1, [101, 102])
   */
  async setPermissionsForRole(roleId: number, permissionIds: number[]) {
    // 1. 验证角色存在
    const roleExists = await this.roleRepo.exist({ where: { id: roleId } });
    if (!roleExists) throw new BadRequestException('角色不存在');

    // 2. 验证所有权限存在
    const perms = await this.permRepo.find({
      where: { id: In(permissionIds) },
      select: ['id'],
    });
    const validPermIds = new Set(perms.map(p => p.id));
    const invalid = permissionIds.filter(id => !validPermIds.has(id));
    if (invalid.length > 0) {
      throw new BadRequestException(`权限ID不存在:  $ {invalid.join(', ')}`);
    }

    // 3. 事务：先清空旧权限，再插入新权限
    return this.dataSource.transaction(async (manager) => {
      const rpRepo = manager.getRepository(RolePermission);

      // 清空该角色的所有权限
      await rpRepo.delete({ roleId });

      // 插入新权限
      if (permissionIds.length > 0) {
        const entities = permissionIds.map(permId =>
          rpRepo.create({ roleId, permissionId: permId })
        );
        await rpRepo.save(entities);
      }
    });
  }

  async getPermissionsByRoleId(roleId: number): Promise<number[]> {
  const relations = await this.rolePermRepo.find({
    where: { roleId },
    select: ['permissionId'],
  });
  return relations.map(r => r.permissionId);
}
}
