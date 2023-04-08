import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Teacher } from './teacher.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TeachersService {
  constructor(
    @InjectRepository(Teacher)
    private readonly teachersRepository: Repository<Teacher>,
  ) {}

  async findAll() {
    return await this.teachersRepository.find();
  }

  async findMe(userId: number) {
    return await this.teachersRepository.findBy({
      user: {
        id: userId,
      },
    });
  }
}
