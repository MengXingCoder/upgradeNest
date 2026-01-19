// src/entities/user.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { UserRole } from './user-role.entity'; // 引入中间表实体

/**
 * 用户实体
 * - 对应数据库表: users
 * - 通过 UserRole 与 Role 建立多对多关系
 * - 不直接引用 Role，避免耦合；通过中间表解耦
 */
@Entity('users') // @@map("users")
export class User {
  @PrimaryGeneratedColumn() // @id @default(autoincrement())
  id: number;

  @Column({ length: 255, unique: true }) // @unique
  username: string;

  @Column({ length: 255 })
  password: string;

  /**
   * 一个 User 可以有多个 UserRole 记录（即拥有多个角色）
   * 使用 @OneToMany 指向中间表
   * 第二个参数是反向关系字段名（在 UserRole 中叫 user）
   */
  @OneToMany(() => UserRole, userRole => userRole.user)
  userRoles: UserRole[];
}