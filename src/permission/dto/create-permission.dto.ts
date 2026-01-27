import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
export class CreatePermissionDto {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 255, unique: true })
    name: string; // e.g., "article:edit"

    @Column({ length: 255 })
    action: string; // 可用于匹配 API 路径或前端标识

    @Column({ nullable: true })
    description?: string;
}
