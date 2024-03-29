import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsOrderValue, ILike, In, Repository } from 'typeorm';
import { Journal } from './journal.entity';
import { FindJournalsDto } from './dto/find-journals.dto';
import { CreateJournalDto } from './dto/create-journal.dto';
import { Group } from '../groups/group.entity';
import { Teacher } from '../teacher/teacher.entity';
import { User } from '../../users/entities/user.entity';
import { UpdateJournaDto } from './dto/update-journal.dto';
import { PartialUpdateDto } from './dto/partial-update.dto';
import { UpdateCellDto } from './dto/update-cell.dto';
import { Student } from '../students/student.entity';
import { GridRow } from './interfaces/grid-row.interface';
import * as _ from 'lodash';
import { createObjectCsvStringifier } from 'csv-writer';

@Injectable()
export class JournalsService {
  constructor(
    @InjectRepository(Journal)
    private readonly journalsRepository: Repository<Journal>,
    @InjectRepository(Group)
    private readonly groupsRepository: Repository<Group>,
    @InjectRepository(Teacher)
    private readonly teachersRepository: Repository<Teacher>,
    @InjectRepository(Student)
    private readonly studentsRepository: Repository<Student>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async removeStudentFromJournal(student: Student) {
    const journals = await this.journalsRepository.find({
      where: {
        group: {
          id: student.group.id,
        },
      },
    });

    if (!journals.length) return;

    journals.forEach((j) => {
      j.rows = j.rows.filter((row) => row.id !== student.id);
    });

    await this.journalsRepository.save(journals);
  }

  async addStudentsToJournal(studentIds: number[], groupId: number) {
    const journals = await this.journalsRepository.find({
      where: {
        group: {
          id: groupId,
        },
      },
    });

    if (!journals.length) return;

    const users = await this.usersRepository.find({
      relations: ['student'],
      where: {
        student: {
          id: In(studentIds),
        },
      },
    });

    if (!users.length) return;

    journals.forEach((j) => {
      users.forEach((user) => {
        j.rows.push({ id: user.student.id, fullName: user.fullName });
      });

      j.rows = _.orderBy(j.rows, (row) => row.fullName, 'asc');
    });

    await this.journalsRepository.save(journals);
  }

  async addStudentToJournal(student: Student) {
    const journals = await this.journalsRepository.find({
      where: {
        group: {
          id: student.group.id,
        },
      },
    });

    if (!journals.length) return;

    const user = await this.usersRepository.findOne({
      where: {
        student: {
          id: student.id,
        },
      },
    });

    if (!user) return;

    journals.forEach((j) => {
      j.rows.push({ id: student.id, fullName: user.fullName });
      j.rows = _.orderBy(j.rows, (row) => row.fullName, 'asc');
    });

    await this.journalsRepository.save(journals);
  }

  async findAll(user: User, dto?: FindJournalsDto) {
    const params = {
      order: { updatedAt: 'DESC' as FindOptionsOrderValue },
      relations: ['teacher', 'teacher.user', 'group'],
      skip: dto?.skip,
      take: dto?.take,
      where: {
        name: undefined,
        teacher: { user: { id: user.id } },
      },
    };

    if (dto?.search) {
      params.where.name = ILike(`%${dto.search}%`);
    }

    return this.journalsRepository.find(params);
  }

  async totalCount(user: User, search?: string) {
    const params = {
      relations: ['teacher', 'teacher.user'],
      where: {
        name: undefined,
        teacher: { user: { id: user.id } },
      },
    };

    if (search) {
      params.where.name = ILike(`%${search}%`);
    }

    return this.journalsRepository.count(params);
  }

  async findOne(user: User, id: number) {
    const journal = await this.journalsRepository.findOne({
      relations: [
        'teacher',
        'teacher.user',
        'group',
        'group.students',
        'group.students.user',
      ],
      where: {
        id,
        teacher: { user: { id: user.id } },
      },
    });

    if (!journal) {
      throw new NotFoundException(null, 'Журнал не знайдено');
    }

    return journal;
  }

  async create(user: User, dto: CreateJournalDto) {
    const group = await this.groupsRepository.findOne({
      relations: ['students', 'students.user'],
      where: {
        id: dto.groupId,
      },
    });

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
      columns: dto.columns,
      description: dto.description,
      group,
      name: dto.name,
      rows: dto.rows,
      teacher,
    });

    return this.journalsRepository.save(journal);
  }

  async update(user: User, id: number, dto: UpdateJournaDto) {
    const journal = await this.journalsRepository.findOne({
      relations: ['teacher', 'teacher.user', 'group'],
      where: {
        id,
        teacher: { user: { id: user.id } },
      },
    });

    if (!journal) {
      throw new NotFoundException(null, 'Журнал не знайдений');
    }

    Object.assign(journal, dto);

    return this.journalsRepository.save(journal);
  }

  async generateCsv(user: User, journalId: number) {
    const journal = await this.journalsRepository.findOne({
      relations: ['teacher', 'teacher.user', 'group'],
      where: {
        id: journalId,
        teacher: { user: { id: user.id } },
      },
    });

    if (!journal) {
      throw new NotFoundException(null, 'Журнал не знайдений');
    }

    const writer = createObjectCsvStringifier({
      header: journal.columns,
    });

    const data = journal.rows.map((row) =>
      Object.entries(row).reduce((acc, [key, value]) => {
        acc[key] = _.isString(value) ? value : value['value'];
        return acc;
      }, {}),
    );

    const content = writer.getHeaderString() + writer.stringifyRecords(data);

    const fileName = encodeURIComponent(
      `${journal.name}`.replace(/[^а-яa-z0-9їі]/gi, '_'),
    );

    return { content, fileName };
  }

  async updateCell(user: User, id: number, dto: UpdateCellDto) {
    const journal = await this.journalsRepository.findOne({
      relations: ['teacher', 'teacher.user', 'group'],
      where: {
        id,
        teacher: { user: { id: user.id } },
      },
    });

    if (!journal) {
      throw new NotFoundException(null, 'Журнал не знайдений');
    }

    journal.rows[dto.index][dto.id] = dto.cell;

    this.journalsRepository.save(journal);
  }

  async partialUpdate(user: User, id: number, dto: PartialUpdateDto) {
    const journal = await this.journalsRepository.findOne({
      relations: ['teacher', 'teacher.user'],
      where: {
        id,
        teacher: { user: { id: user.id } },
      },
    });

    if (!journal) {
      throw new NotFoundException(null, 'Журнал не знайдений');
    }

    journal.name = dto.name || journal.name;
    journal.description = dto.description || journal.description;

    return this.journalsRepository.save(journal);
  }

  async remove(user: User, id: number) {
    const journal = await this.journalsRepository.findOne({
      relations: ['teacher', 'teacher.user'],
      where: {
        id,
        teacher: { user: { id: user.id } },
      },
    });

    if (!journal) {
      throw new NotFoundException(null, 'Журнал не знайдений');
    }

    return this.journalsRepository.delete(id);
  }

  static getStudentData(journal: Journal, student: Student) {
    const row = journal.rows.find((row) => row.id === student.id);
    const visibleColumns = journal.columns.filter(
      ({ visibleForStudents }) => visibleForStudents,
    );

    const studentRow = {};

    visibleColumns.forEach(({ id }) => {
      studentRow[id] = row[id];
    });

    return { studentRow, visibleColumns };
  }

  async getStudentGradeDetails(user: User, journalId: number) {
    const student = await this.studentsRepository.findOne({
      where: {
        user: { id: user.id },
      },
    });

    if (!student) {
      throw new NotFoundException(null, 'Студент не знайдений');
    }

    const journal = await this.journalsRepository.findOne({
      relations: ['group', 'group.students'],
      where: {
        id: journalId,
        group: {
          students: {
            id: student.id,
          },
        },
      },
    });

    const { visibleColumns, studentRow } = JournalsService.getStudentData(
      journal,
      student,
    );

    journal.columns = visibleColumns;
    journal.rows = [studentRow as GridRow];

    delete journal.group.students;
    delete journal.group.curator;

    return journal;
  }

  async getStudentGrades(user: User, dto?: FindJournalsDto) {
    const student = await this.studentsRepository.findOne({
      where: {
        user: { id: user.id },
      },
    });

    if (!student) {
      throw new NotFoundException(null, 'Студент не знайдений');
    }

    const params = {
      order: { updatedAt: 'DESC' as FindOptionsOrderValue },
      relations: ['group', 'group.students'],
      skip: dto?.skip,
      take: dto?.take,
      where: {
        name: undefined,
        group: {
          students: {
            id: student.id,
          },
        },
      },
    };

    if (dto?.search) {
      params.where.name = ILike(`%${dto.search}%`);
    }

    const journals = await this.journalsRepository.find(params);

    const filteredJournals = journals.map((journal) => {
      delete journal.group.students;
      delete journal.group.curator;
      delete journal.rows;
      delete journal.columns;

      return journal;
    });

    return filteredJournals;
  }
}
