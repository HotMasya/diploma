import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Faculty } from './faculty.entity';
import { Repository } from 'typeorm';
import { AdminFindDto } from '../../dto/admin-find.dto';
import { CreateFacultyDto } from './dto/create-faculty.dto';
import { UpdateFacultyDto } from './dto/update-faculty.dto';

@Injectable()
export class FacultiesService {
  constructor(
    @InjectRepository(Faculty)
    private readonly facultiesRepository: Repository<Faculty>,
  ) {}

  async findAll(dto: AdminFindDto) {
    const builder = this.facultiesRepository
      .createQueryBuilder('faculty')
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

  async getTotalCount() {
    return await this.facultiesRepository.count();
  }

  async create(dto: CreateFacultyDto) {
    const group = this.facultiesRepository.create(dto);

    return this.facultiesRepository.save(group);
  }

  async update(id: number, dto: UpdateFacultyDto) {
    return this.facultiesRepository.update(id, dto);
  }

  async delete(id: number) {
    return this.facultiesRepository.delete(id);
  }
}
