import { Injectable, Logger } from '@nestjs/common';
import { CreateSeedDto } from './dto/create-seed.dto';
import { UpdateSeedDto } from './dto/update-seed.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '../entities/role.entity';
import { Permission } from '../entities/permission.entity';
import { RolePermissionService } from '../role/role-permission.service';
import { RolePermission } from 'src/entities/role.permission.entity';
@Injectable()
export class SeedService {
  private readonly logger = new Logger(SeedService.name);
  constructor(
    @InjectRepository(Role)
    private roleRepo: Repository<Role>,
    @InjectRepository(Permission)
    private permRepo: Repository<Permission>,
    @InjectRepository(RolePermission)
    private rpRepo: Repository<RolePermission>,
  ) {}

  /**
   * 初始化系统默认数据（幂等操作：多次执行结果一致）
   */
  async seed() {
    console.log('🚀 [SEED] 开始执行系统初始化...');

    try {
      // 定义默认角色和它们的权限
      const defaultRoles = [
        {
          id: 1,
          name: '普通用户',
          description: '系统默认角色',
          permissions: ['user:read', 'article:read'],
        },
        {
          id: 10,
          name: '管理员用户',
          description: '管理员',
          permissions: [
            'user:read',
            'user:write',
            'article:read',
            'article:write',
          ],
        },
        {
          id: 100,
          name: 'root用户',
          description: '拥有最高权限',
          permissions: ['*'], // 或者列出所有权限
        },
      ];

      // 确保所有权限存在，并收集 ID
      const allPermissionNames = [
        ...new Set(defaultRoles.flatMap(r => r.permissions)),
      ];
      const permissionMap: Record<string, number> = {};

      for (const name of allPermissionNames) {
        let perm = await this.permRepo.findOne({ where: { name } });
        if (!perm) {
          perm = await this.permRepo.save({
            name,
            action: name.includes(':') ? name.split(':')[1] : 'all',
            description: ` $ {name} 权限`,
          });
          console.log(`✅ 创建权限:  ${name} (ID= ${perm.id})`);
        }
        permissionMap[name] = perm.id;
      }

      // 为每个角色设置权限
      for (const roleDef of defaultRoles) {
        // 确保角色存在（幂等）
        let role = await this.roleRepo.findOne({ where: { id: roleDef.id } });
        if (!role) {
          role = await this.roleRepo.save({
            id: roleDef.id,
            name: roleDef.name,
            description: roleDef.description,
          });
          console.log(`✅ 创建角色:  ${role.name} (ID= ${role.id})`);
        }

        // 获取期望的权限 ID 列表
        const expectedPermIds = roleDef.permissions.map(
          name => permissionMap[name],
        );

        // 获取当前已分配的权限 ID
        const currentRelations = await this.rpRepo.find({
          where: { roleId: role.id },
        });
        const currentPermIds = currentRelations.map(r => r.permissionId);
        const currentSet = new Set(currentPermIds);
        const expectedSet = new Set(expectedPermIds);

        // 如果不一致，重新绑定
        if (!this.setsEqual(currentSet, expectedSet)) {
          // 先删除旧的
          await this.rpRepo.delete({ roleId: role.id });
          // 再插入新的
          if (expectedPermIds.length > 0) {
            const newRelations = expectedPermIds.map(pid => ({
              roleId: role.id,
              permissionId: pid,
            }));
            await this.rpRepo.save(newRelations);
          }
          console.log(
            `✅ 角色 " ${role.name}" (ID= ${role.id}) 权限已更新:  ${expectedPermIds}`,
          );
        } else {
          console.log(`ℹ️ 角色 " ${role.name}" 权限已符合预期`);
        }
      }

      console.log('🎉 系统默认数据初始化完成！');
    } catch (error) {
      console.error('💥 Seed 失败:', error);
      throw error;
    }
  }

  private setsEqual<T>(a: Set<T>, b: Set<T>): boolean {
    if (a.size !== b.size) return false;
    for (const item of a) {
      if (!b.has(item)) return false;
    }
    return true;
  }

  // 如果你想要更严格的“已执行”标记，可以建一张 seed_logs 表
  private async markAsSeeded() {
    // 这里只是示例，实际可省略
    // 因为我们通过“角色1有权限”来判断是否已初始化
  }
  create(createSeedDto: CreateSeedDto) {
    return 'This action adds a new seed';
  }

  findAll() {
    return `This action returns all seed`;
  }

  findOne(id: number) {
    return `This action returns a #${id} seed`;
  }

  update(id: number, updateSeedDto: UpdateSeedDto) {
    return `This action updates a #${id} seed`;
  }

  remove(id: number) {
    return `This action removes a #${id} seed`;
  }
}
