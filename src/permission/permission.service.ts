import { Injectable } from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from 'src/entities/permission.entity';
import { Repository } from 'typeorm';
@Injectable()
export class PermissionService {
    constructor(@InjectRepository(Permission) private repo: Repository<Permission>) { }
    async create(createPermissionDto: CreatePermissionDto) {
        return await this.repo.save(createPermissionDto);
    }

    async findAll(page: number = 1, limit: number = 10) {
        const skip = (page - 1) * limit
        const res = await this.repo.find({ skip, take: limit })
        console.log('查找所有的permission', res)
        return res
    }

    async findOne(id: number) {
        const res = await this.repo.findOne({ where: { id } })
        return res
    }

    async update(id: number, updatePermissionDto: UpdatePermissionDto) {
        return await this.repo.update(id, updatePermissionDto);
    }

    async remove(id: number) {
        return await this.repo.delete({ id });
    }
}
