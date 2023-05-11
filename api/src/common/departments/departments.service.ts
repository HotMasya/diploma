import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { Department } from './department.entity';
import { AdminFindDto } from '../../dto/admin-find.dto';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';

@Injectable()
export class DepartmentsService {
  constructor(
    @InjectRepository(Department)
    private readonly departmentsRepository: Repository<Department>,
  ) {}

  async findAll(dto: AdminFindDto) {
    const builder = this.departmentsRepository
      .createQueryBuilder('department')
      .select()
      .skip(dto.skip)
      .take(dto.take);

    if (dto.order) {
      const [field, order] = dto.order.split(' ');

      builder.orderBy(`${builder.alias}.${field}`, order as 'ASC' | 'DESC');
    }

    if (dto.search) {
      const params = {
        searchQuery: `%${dto.search}%`,
      };

      builder
        .where(`${builder.alias}.name ILIKE :searchQuery`, params)
        .orWhere(`${builder.alias}.shortName ILIKE :searchQuery`, params);
    }

    if (dto.excludeIds?.length) {
      const params = {
        ids: dto.excludeIds,
      };

      builder.andWhere(`${builder.alias}.id NOT IN (:...ids)`, params);
    }

    return builder.getMany();
  }

  async getTotalCount(search?: string) {
    if (!search) {
      return await this.departmentsRepository.count();
    } else {
      return await this.departmentsRepository.count({
        where: [
          { name: ILike(`%${search}%`) },
          { shortName: ILike(`%${search}%`) },
        ],
      });
    }
  }

  async create(dto: CreateDepartmentDto) {
    const group = this.departmentsRepository.create(dto);

    return this.departmentsRepository.save(group);
  }

  async update(id: number, dto: UpdateDepartmentDto) {
    return this.departmentsRepository.update(id, dto);
  }

  async delete(id: number) {
    return this.departmentsRepository.delete(id);
  }
}
