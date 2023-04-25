import { Injectable } from '@nestjs/common';
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

  async findAll(dto: AdminFindDto) {
    const builder = this.groupsRepository
      .createQueryBuilder('group')
      .select()
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

  async delete(id: number) {
    return this.groupsRepository.delete(id);
  }
}
