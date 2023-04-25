import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Teacher } from './teacher.entity';
import { In, Repository } from 'typeorm';
import { AdminFindDto } from '../../dto/admin-find.dto';
import { UsersService } from '../../users/users.service';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { Department } from '../departments/department.entity';

@Injectable()
export class TeachersService {
  constructor(
    @InjectRepository(Teacher)
    private readonly teachersRepository: Repository<Teacher>,
    @InjectRepository(Department)
    private readonly departmentsRepository: Repository<Department>,
  ) {}

  async findAll(dto?: AdminFindDto) {
    const builder = this.teachersRepository
      .createQueryBuilder('teacher')
      .leftJoinAndSelect('teacher.user', 'user')
      .skip(dto.skip)
      .take(dto.take);

    if (dto.order) {
      const [field, order] = dto.order.split(' ');

      builder.orderBy(`${builder.alias}.${field}`, order as 'ASC' | 'DESC');
    }

    UsersService.addSearchWhere(builder, dto.search);

    return builder.getMany();
  }

  async findMe(userId: number) {
    return await this.teachersRepository.findOne({
      relations: ['departments'],
      where: {
        user: {
          id: userId,
        },
      },
    });
  }

  async create(userId: number) {
    const teacher = this.teachersRepository.create({ user: { id: userId } });

    return this.teachersRepository.save(teacher);
  }

  async update(teacherId: number, dto: UpdateTeacherDto) {
    const teacher = await this.teachersRepository.findOne({
      relations: ['departments'],
      where: { id: teacherId },
    });

    if (!teacher) {
      throw new NotFoundException(null, 'Викладач не знайдений');
    }

    if (dto.departmentIds.length) {
      const departments = await this.departmentsRepository.findBy({
        id: In(dto.departmentIds),
      });

      teacher.departments = departments;
    }

    return this.teachersRepository.save(teacher);
  }

  async delete(teacherId: number) {
    return this.teachersRepository.delete(teacherId);
  }
}
