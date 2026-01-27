import {
  BadRequestException,
  Injectable,
  NotFoundException,
  Version,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Role } from 'src/entities/role.entity';
import { UserRole } from 'src/entities/user.role.entity';
import { Repository, DataSource, In } from 'typeorm';
import { version } from 'os';

import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepo1: Repository<User>,
    @InjectRepository(Role) private roleRepository: Repository<Role>,
    @InjectRepository(UserRole) private userRoleRepo: Repository<UserRole>,
    private dataSource: DataSource,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const { username, password, roleIds = [] } = createUserDto;

    // 1. 验证角色（不涉及数据库写入，可提前做）

    // 先看创建用户时传过来的 roleIds是否为空数组 如果为空数组 那么就是吧默认的1传进去 代表普通用户
    // 如果传过来的roleIds 数组不为空 那么就要去role角色表中 查一下 roleIds的角色id值 在不在role角色表中能否找到
    // 如果roleIds中的id值 不在role表中 那么即代表传入的roleIds的id值 不合法 抛出异常，
    // 如果在role的表中 那么赋值给finalRoleIds  后续随创建用户时一并进行关联
    let finalRoleIds = [1]; // 默认
    if (roleIds.length > 0) {
      const existingRoles = await this.roleRepository.find({
        where: { id: In(roleIds) },
        select: ['id'],
      });
      const existingIds = new Set(existingRoles.map(r => r.id));
      const invalid = roleIds.filter(id => !existingIds.has(id));
      if (invalid.length)
        throw new BadRequestException(`角色不存在:  $ {invalid.join(', ')}`);
      finalRoleIds = [...existingIds];
    }

    // 2. 确保默认角色存在（如果用到了）
    if (finalRoleIds.includes(1)) {
      const exists = await this.roleRepository.exist({ where: { id: 1 } });
      if (!exists) throw new Error('默认角色 ID=1 未初始化');
    }

    // 3. 事务：创建用户 + 关联角色
    return this.dataSource.transaction(async manager => {
      const userRepo = manager.getRepository(User);
      const userRoleRepo = manager.getRepository(UserRole);

      // 检查用户名是否重复（ 必须在事务内查！避免并发问题）
      const existingUser = await userRepo.findOne({ where: { username } });
      if (existingUser) {
        throw new BadRequestException('用户名已存在');
      }

      // 创建用户
      const hashedPassword = await bcrypt.hash(password, 10);
      const savedUser = await userRepo.save({
        username,
        password: hashedPassword,
      });

      // 批量插入角色关联
      const userRoles = finalRoleIds.map(roleId =>
        userRoleRepo.create({ userId: savedUser.id, roleId }),
      );
      await userRoleRepo.insert(userRoles);

      // 返回脱敏后的用户（不要返回密码！）
      delete savedUser.password;
      return savedUser;
    });
  }
  async create2(createUserDto: CreateUserDto) {
    //这是新增用户时 连带赋予用户角色的功能
    const { username, password, roleIds = [] } = createUserDto;
    // 🔑 第一步：确定最终角色 ID 列表（关键！）
    // ================================
    let finalRoleIds: number[];

    if (roleIds.length === 0) {
      // 没给 → 用默认角色 ID=1
      finalRoleIds = [1];
    } else {
      // 给了 → 验证这些 roleIds 在 roles 表中是否存在！
      const existingRoles = await this.roleRepository.find({
        where: { id: roleIds as any }, // TypeORM 支持 in 查询
        select: ['id'], // 只查 id，提高性能
      });

      const existingIds = new Set(existingRoles.map(r => r.id));
      const invalidIds = roleIds.filter(id => !existingIds.has(id));

      if (invalidIds.length > 0) {
        throw new BadRequestException(
          `角色ID不存在:  $ {invalidIds.join(', ')}`,
        );
      }

      finalRoleIds = Array.from(existingIds); // 去重
    }
    // ================================
    // 🔑 第二步：验证默认角色是否存在（如果用到了）
    // ================================
    if (finalRoleIds.includes(1)) {
      const hasDefaultRole = await this.roleRepository.exist({
        where: { id: 1 },
      });
      if (!hasDefaultRole) {
        throw new Error('系统默认角色 (ID=1) 未初始化');
      }
    }

    // ================================
    // 🔑 第三步：开启事务，创建用户 + 关联角色
    // ================================
    return await this.dataSource.transaction(async manager => {
      const userRepo = manager.getRepository(User);
      const userRoleRepo = manager.getRepository(UserRole);

      // 1. 创建用户（此时才生成 user.id）
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = userRepo.create({ username, password: hashedPassword });
      const savedUser = await userRepo.save(newUser); // 👈 这里得到 user.id

      // 2. 批量插入 user_roles（使用 savedUser.id 和已验证的 finalRoleIds）
      const userRoleEntities = finalRoleIds.map(roleId =>
        userRoleRepo.create({
          userId: savedUser.id, // ✅ 现在有 user.id 了
          roleId: roleId, // ✅ 这些 roleId 已提前验证过存在
        }),
      );
      await userRoleRepo.save(userRoleEntities);
      console.log('即将返回用户:', savedUser.id);
      console.log('分配的角色 IDs:', finalRoleIds);
      throw new Error('TEST ROLLBACK');
      return savedUser;
    });

    //这是初始的单表user新增用户
    // const { username, password } = createUserDto;

    // // // 检查用户名是否已存在
    // const existingUser = await this.findOne(username);
    // console.log('existingUser', existingUser)
    // if (existingUser) {
    //     throw new BadRequestException('Username already exists');
    // }
    // const hashedPassword = await bcrypt.hash(password, 10);
    // // 直接保存到数据库中
    // return await this.userRepo1.save({
    //     username,
    //     password: hashedPassword
    // });

    //1、先create 创建实体对象 2、再通过save把实体对象保存到数据库中
    // const newUser = this.userRepo1.create({
    //     username,
    //     password
    // });
    // return await this.userRepo1.save(newUser);
  }
  async create1(createUserDto) {
    console.log('this.userRepo1', this.userRepo1);
    const { username, password } = createUserDto;

    const existingUser = await this.findOne(username);
    console.log('existingUser', existingUser);
    if (existingUser) {
      throw new BadRequestException('Username already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    // 直接保存到数据库中
    return await this.userRepo1.save({
      username,
      password: hashedPassword,
    });
  }
  async findAll() {
    //   return 'This action adds a new user';  mysql-a
    // return await this.userRepoCommon.getRepository().find()
    return await this.userRepo1.find();
  }

  async findOne(username: string) {
    const res = await this.userRepo1.findOne({
      where: { username },
    });
    return res;
  }

  async findUser(username: string) {
    const res = await this.userRepo1.findOne({
      where: { username },
    });
    if (!res) {
      throw new NotFoundException(`User "${username}" does not exist`);
    }
    console.log('userservice res', res);
    return res;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
