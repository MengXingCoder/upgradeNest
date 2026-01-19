// src/entities/user-role.entity.ts
import { Entity, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { Role } from './role.entity';

/**
 * 用户-角色关联实体（显式中间表）
 * - 对应数据库表: user_roles
 * - 联合主键 [roleId, userId] 防止重复分配
 * - 必须显式定义，因为 Prisma 中有 model UserRole
 */
@Entity('user_roles') // @@map("user_roles")
export class UserRole {
  /**
   * 联合主键 part 1
   * 注意：这里用 @PrimaryColumn 而不是 @PrimaryGeneratedColumn
   * 因为值来自外键，不是自增
   */
  @PrimaryColumn({ type: 'int' })
  userId: number;

  @PrimaryColumn({ type: 'int' })
  roleId: number;

  /**
   * 多对一：每个 UserRole 记录属于一个 User
   * @JoinColumn 指定外键列名为 userId（与 Prisma 一致）
   */
  @ManyToOne(() => User, user => user.userRoles)
  @JoinColumn({ name: 'userId' })
  user: User;

  /**
   * 多对一：每个 UserRole 记录属于一个 Role
   */
  @ManyToOne(() => Role, role => role.userRoles)
  @JoinColumn({ name: 'roleId' })
  role: Role;
}