// src/entities/role.entity.ts
import { Entity, PrimaryGeneratedColumn, Column,PrimaryColumn, OneToMany } from 'typeorm';
import { UserRole } from './user.role.entity';
import { RolePermission } from './role.permission.entity'; // 注意：Prisma 中叫 RolePermissions，但 TS 类名建议单数

/**
 * 角色实体
 * - 对应数据库表: roles
 * - 通过两个中间表分别连接 User 和 Permission
 */
@Entity('roles') // @@map("roles")
export class Role {
//   @PrimaryGeneratedColumn()
  @PrimaryColumn()
  id: number;

  @Column({ length: 255, unique: true })
  name: string; // 如 "admin", "editor"

  @Column({ nullable: true })
  description?: string;

  /**
   * 一个 Role 被多个 UserRole 引用（即被多个用户拥有）
   */
  @OneToMany(() => UserRole, userRole => userRole.role)
  userRoles: UserRole[];

  /**
   * 一个 Role 拥有多个 RolePermission 记录（即拥有多个权限）
   */
  @OneToMany(() => RolePermission, rolePerm => rolePerm.role)
  rolePermissions: RolePermission[];
}