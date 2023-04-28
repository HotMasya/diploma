import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { Group } from './group.entity';
import { AdminFindDto } from '../../dto/admin-find.dto';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { Teacher } from '../teacher/teacher.entity';
import { Student } from '../students/student.entity';

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(Group)
    private readonly groupsRepository: Repository<Group>,
    @InjectRepository(Teacher)
    private readonly teacherRepository: Repository<Teacher>,
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
  ) {}

  private static validateGroup(group: Group) {
    if (!group) {
      throw new NotFoundException(null, 'Група не знайдена');
    }
  }

  async findOne(id: number) {
    const builder = this.groupsRepository
      .createQueryBuilder('group')
      .leftJoinAndSelect('group.curator', 'curator')
      .leftJoinAndSelect('curator.user', 'user')
      .leftJoinAndSelect('curator.departments', 'departments')
      .addSelect(
        (qb) =>
          qb
            .select('COUNT(*)')
            .from(Student, 's')
            .where('group.id = s.groupid'),
        'studentsCount',
      )
      .where('group.id = :id', { id });

    const group = await builder.getOne();

    GroupsService.validateGroup(group);

    return group;
  }

  async findAll(dto: AdminFindDto) {
    const builder = this.groupsRepository
      .createQueryBuilder('group')
      .leftJoinAndSelect('group.curator', 'curator')
      .leftJoinAndSelect('curator.user', 'user')
      .addSelect(
        (qb) =>
          qb
            .select('COUNT(*)')
            .from(Student, 's')
            .where('group.id = s.groupid'),
        'studentsCount',
      )
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

      builder.where(`${builder.alias}.name ILIKE :searchQuery`, params);
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
      return await this.groupsRepository.count();
    }

    return await this.groupsRepository.count({
      where: {
        name: ILike(`%${search}%`),
      },
    });
  }

  async create(dto: CreateGroupDto) {
    const existingGroup = await this.groupsRepository.findOneBy({
      name: dto.name,
    });

    if (existingGroup) {
      throw new ConflictException(null, 'Група з такою назвою вже існує');
    }

    const group = this.groupsRepository.create(dto);

    return this.groupsRepository.save(group);
  }

  async update(id: number, dto: UpdateGroupDto) {
    const group = await this.groupsRepository.findOneBy({ id });

    const updatedGroup = { ...group, ...dto, updatedAt: new Date() };

    if (dto.curatorId) {
      const curator = new Teacher();
      curator.id = dto.curatorId;

      updatedGroup.curator = curator;

      delete updatedGroup.curatorId;
    }

    await this.groupsRepository.update(id, updatedGroup);

    return updatedGroup as Group;
  }

  async removeCurator(id: number) {
    const group = await this.findOne(id);

    if (group.curator) {
      group.curator = null;
    }

    return this.groupsRepository.save(group);
  }

  async delete(id: number) {
    return this.groupsRepository.delete(id);
  }
}
