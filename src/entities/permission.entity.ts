// src/entities/permission.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { RolePermission } from './role.permission.entity';

/**
 * 权限实体
 * - 对应数据库表: permissions
 * - name 建议格式: "resource:action" (如 "user:delete")
 */
@Entity('permissions') // @@map("permissions")
export class Permission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255, unique: true })
  name: string; // e.g., "article:edit"

  @Column({ length: 255 })
  action: string; // 可用于匹配 API 路径或前端标识

  @Column({ nullable: true })
  description?: string;

  /**
   * 一个 Permission 被多个 RolePermission 引用
   */
  @OneToMany(() => RolePermission, rolePerm => rolePerm.permission)
  rolePermissions: RolePermission[];
}