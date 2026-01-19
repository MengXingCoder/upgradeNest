import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/entities/role.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RoleService {
    constructor(@InjectRepository(Role) private roleRepo: Repository<Role>) { }
    create(createRoleDto: CreateRoleDto) {
        return this.roleRepo.save(createRoleDto)
    }

    findAll(page: number = 1, limit: number = 10) {
        const skip = (page-1)*limit
        return this.roleRepo.find({skip,take:limit})
    }

    findOne(id: number) {
        return this.roleRepo.findOne({ where: {id} })
    }

    async update(id: number, updateRoleDto: UpdateRoleDto) {
        return await this.roleRepo.update(id, updateRoleDto)
    }

    remove(id: number) {
        return this.roleRepo.delete({ id })
    }
}
