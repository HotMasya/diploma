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
import * as _ from 'lodash';
import { JournalsService } from '../journals/journals.service';

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(Group)
    private readonly groupsRepository: Repository<Group>,
    @InjectRepository(Teacher)
    private readonly teacherRepository: Repository<Teacher>,
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
    private readonly journalsService: JournalsService,
  ) {}

  async findOne(id: number) {
    const builder = this.groupsRepository
      .createQueryBuilder('group')
      .select(
        (qb) =>
          qb
            .subQuery()
            .select('COALESCE(COUNT(*), 0)::INTEGER')
            .from(Student, 's')
            .where('s.groupid = group.id'),
        'studentsCount',
      )
      .leftJoinAndSelect('group.curator', 'curator')
      .leftJoinAndSelect('curator.user', 'user')
      .leftJoinAndSelect('curator.departments', 'departments')
      .where('group.id = :id', { id });

    const { raw, entities } = await builder.getRawAndEntities();

    if (!entities.length) {
      throw new NotFoundException(null, 'Група не знайдена');
    }

    const group = entities[0];

    group.studentsCount = raw[0].studentsCount;

    return group;
  }

  async addStudents(groupId: number, ids: number[]) {
    const group = await this.groupsRepository.findOne({
      relations: ['students'],
      where: { id: groupId },
    });

    if (!group) {
      throw new NotFoundException(null, 'Група не знайдена');
    }

    const students = ids.map((id) => {
      const student = new Student();
      student.id = id;

      return student;
    });

    await this.journalsService.addStudentsToJournal(ids, groupId);

    group.students = [...group.students, ...students];

    await this.groupsRepository.save(group);
  }

  async findAll(dto: AdminFindDto) {
    const builder = this.groupsRepository
      .createQueryBuilder('g')
      .select(
        (qb) =>
          qb
            .subQuery()
            .select('COALESCE(COUNT(*), 0)::INTEGER')
            .from(Student, 's')
            .where('s.groupid = g.id'),
        'studentsCount',
      )
      .leftJoinAndSelect('g.curator', 'curator')
      .leftJoinAndSelect('curator.user', 'user')
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

    const { raw, entities } = await builder.getRawAndEntities();

    return entities.map((entity, idx) => {
      entity.studentsCount = raw[idx].studentsCount;

      return entity;
    });
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

  async removeStudent(groupId: number, studentId: number) {
    const group = await this.groupsRepository.findOne({
      relations: ['students'],
      where: {
        id: groupId,
      },
    });

    if (!group) {
      throw new NotFoundException(null, 'Група не знайдена');
    }

    const student = await this.studentRepository.findOneBy({ id: studentId });

    if (!student) return;

    group.students = _.filter(group.students, ({ id }) => id !== studentId);

    await this.journalsService.removeStudentFromJournal(student);

    return this.groupsRepository.save(group);
  }

  async delete(id: number) {
    return this.groupsRepository.delete(id);
  }
}
