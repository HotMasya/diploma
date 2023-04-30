import {
  HttpVersionNotSupportedException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { Journal } from './journal.entity';
import { FindJournalsDto } from './dto/find-journals.dto';
import { CreateJournalDto } from './dto/create-journal.dto';
import { Group } from '../groups/group.entity';
import { Teacher } from '../teacher/teacher.entity';
import { User } from '../../users/entities/user.entity';

@Injectable()
export class JournalsService {
  constructor(
    @InjectRepository(Journal)
    private readonly journalsRepository: Repository<Journal>,
    @InjectRepository(Group)
    private readonly groupsRepository: Repository<Group>,
    @InjectRepository(Teacher)
    private readonly teachersRepository: Repository<Teacher>,
  ) {}

  async findAll(user: User, dto?: FindJournalsDto) {
    const params = {
      skip: dto?.skip,
      take: dto?.take,
      where: undefined,
    };

    if (dto?.search) {
      params.where = {
        name: ILike(`%${dto.search}%`),
      };
    }

    return this.journalsRepository.find(params);
  }

  async findOne(id: number) {
    return this.journalsRepository.findOne({
      relations: [
        'teacher',
        'teacher.user',
        'group',
        'group.students',
        'group.students.user',
      ],
      where: { id },
    });
  }

  async create(user: User, dto: CreateJournalDto) {
    const group = await this.groupsRepository.findOneBy({ id: dto.groupId });

    if (!group) {
      throw new NotFoundException(null, 'Група не знайдена');
    }

    const teacher = await this.teachersRepository.findOne({
      relations: ['user'],
      where: {
        user: { id: user.id },
      },
    });

    if (!teacher) {
      throw new NotFoundException(null, 'Викладач не знайдений');
    }

    const journal = this.journalsRepository.create({
      name: dto.name,
      description: dto.description,
      teacher,
      group,
    });

    return this.journalsRepository.save(journal);
  }

  async update() {
    throw new HttpVersionNotSupportedException();
  }

  async remove(user: User, id: number) {
    const teacher = await this.teachersRepository.findOne({
      relations: ['user'],
      where: {
        user: { id: user.id },
      },
    });

    if (!teacher) {
      throw new NotFoundException(null, 'Викладач не знайдений');
    }

    const journal = await this.journalsRepository.findOne({
      relations: ['teacher'],
      where: {
        id,
        teacher: { id: teacher.id },
      },
    });

    if (!journal) {
      throw new NotFoundException(null, 'Журнал не знайдений');
    }

    return this.journalsRepository.delete(id);
  }
}
