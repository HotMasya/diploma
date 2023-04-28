import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './student.entity';
import { IsNull, Repository } from 'typeorm';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Group } from '../groups/group.entity';
import { Faculty } from '../faculties/faculty.entity';
import { AdminFindDto } from '../../dto/admin-find.dto';
import { UsersService } from '../../users/users.service';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private readonly studentsRepository: Repository<Student>,
    @InjectRepository(Group)
    private readonly groupsRepository: Repository<Group>,
    @InjectRepository(Faculty)
    private readonly facultiesRepository: Repository<Faculty>,
  ) {}

  async findAll(dto?: AdminFindDto) {
    const builder = this.studentsRepository
      .createQueryBuilder('student')
      .leftJoinAndSelect('student.user', 'user')
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
    return await this.studentsRepository.findBy({
      user: {
        id: userId,
      },
    });
  }

  async create(userId: number) {
    const student = this.studentsRepository.create({ user: { id: userId } });
    return this.studentsRepository.save(student);
  }

  async update(studentId: number, dto: UpdateStudentDto) {
    const student = await this.studentsRepository.findOne({
      relations: ['group', 'faculty'],
      where: { id: studentId },
    });

    if (!student) {
      throw new NotFoundException(null, 'Студент не знайдений');
    }

    if (dto.groupId !== student.group?.id) {
      const group = await this.groupsRepository.findOneBy({
        id: dto.groupId || IsNull(),
      });

      student.group = group;
    }

    if (dto.facultyId !== student.faculty?.id) {
      const faculty = await this.facultiesRepository.findOneBy({
        id: dto.facultyId || IsNull(),
      });

      student.faculty = faculty;
    }

    student.updatedAt = new Date();

    return this.studentsRepository.save(student);
  }

  async delete(teacherId: number) {
    return this.studentsRepository.delete(teacherId);
  }
}
