import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
    const studentsBuilder =
      this.studentRepository.createQueryBuilder('students');

    // const countSubquery = studentsBuilder.select('COUNT(*)').where(`${studentsBuilder.alias}.user`)

    const builder = this.groupsRepository
      .createQueryBuilder('group')
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

      builder.where(`${builder.alias}.name ILIKE :searchQuery`, params);
    }

    return builder.getMany();
  }

  async getTotalCount() {
    return await this.groupsRepository.count();
  }

  async create(dto: CreateGroupDto) {
    const group = this.groupsRepository.create(dto);

    return this.groupsRepository.save(group);
  }

  async update(id: number, dto: UpdateGroupDto) {
    const group = await this.groupsRepository.findOneBy({ id });

    const updatedGroup = { ...group, ...dto, updatedAt: new Date() };

    await this.groupsRepository.update(id, updatedGroup);

    return updatedGroup as Group;
  }

  async delete(id: number) {
    return this.groupsRepository.delete(id);
  }
}
