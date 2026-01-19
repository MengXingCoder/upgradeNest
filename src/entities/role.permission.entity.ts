// src/entities/role-permission.entity.ts
import { Entity, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Role } from './role.entity';
import { Permission } from './permission.entity';

/**
 * 角色-权限关联实体（显式中间表）
 * - 对应数据库表: role_permissions
 * - 联合主键 [roleId, permissionId] 防止重复授权
 */
@Entity('role_permissions') // @@map("role_permissions")
export class RolePermission {
  @PrimaryColumn({ type: 'int' })
  roleId: number;

  @PrimaryColumn({ type: 'int' })
  permissionId: number;

  @ManyToOne(() => Role, role => role.rolePermissions)
  @JoinColumn({ name: 'roleId' })
  role: Role;

  @ManyToOne(() => Permission, perm => perm.rolePermissions)
  @JoinColumn({ name: 'permissionId' })
  permission: Permission;
}