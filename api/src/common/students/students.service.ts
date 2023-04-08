import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './student.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private readonly studentsRepository: Repository<Student>,
  ) {}

  async findAll() {
    return await this.studentsRepository.find();
  }

  async findMe(userId: number) {
    return await this.studentsRepository.findBy({
      user: {
        id: userId,
      },
    });
  }
}
