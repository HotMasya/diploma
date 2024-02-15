import { InjectRepository } from '@nestjs/typeorm';
import { Log } from './log.entity';
import { FindManyOptions, IsNull, Not, Repository } from 'typeorm';
import { CreateLogDto } from './dto/create-log.dto';
import { createObjectCsvStringifier } from 'csv-writer';
import { FindLogsDto } from './dto/find-logs.dto';
import { Journal } from '../journals/journal.entity';
import { NotFoundException } from '@nestjs/common';
import { format } from 'date-fns';

export class LogService {
  constructor(
    @InjectRepository(Log)
    private readonly logRepository: Repository<Log>,
    @InjectRepository(Journal)
    private readonly journalsRepository: Repository<Journal>,
  ) {}

  async getLogsByJournal(dto?: FindLogsDto) {
    const params: FindManyOptions<Log> = {
      relations: ['student.user', 'teacher.user'],
      order: {
        createdAt: 'DESC',
      },
      where: {
        journal: {
          id: dto.journalId,
        },
        student: {
          id: Not(IsNull()),
        },
      },
    };

    if (dto?.skip) {
      params.skip = dto.skip;
    }

    if (dto?.take) {
      params.take = dto.take;
    }

    return this.logRepository.find(params);
  }

  async getLogsTotalCount(journalId: number) {
    return this.logRepository.countBy({
      journal: {
        id: journalId,
      },
      student: {
        id: Not(IsNull()),
      },
    });
  }

  async createLog(dto: CreateLogDto) {
    const log = this.logRepository.create({
      columnId: dto.id,
      columnTitle: dto.column,
      index: dto.index,
      message: dto.message,
      teacher: {
        id: dto.teacherId,
      },
      student: {
        id: dto.studentId,
      },
      journal: {
        id: dto.journalId,
      },
    });

    return await this.logRepository.save(log);
  }

  async generateCsv(journalId: number) {
    const journal = await this.journalsRepository.findOneBy({ id: journalId });

    if (!journal) {
      throw new NotFoundException(null, 'Журнал не знайдено');
    }

    const logs = await this.getLogsByJournal({ journalId } as FindLogsDto);

    const writer = createObjectCsvStringifier({
      header: [
        {
          id: 'student',
          title: 'Студент',
        },
        {
          id: 'message',
          title: 'Повідомлення',
        },
        {
          id: 'teacher',
          title: 'Викладач/Асистент',
        },
        {
          id: 'createdAt',
          title: 'Дата',
        },
      ],
      fieldDelimiter: ';',
      headerIdDelimiter: ';',
    });

    const headers = writer.getHeaderString();

    const data = logs.map((log) => ({
      student: log.student.user.fullName,
      message: log.message,
      teacher: log.teacher.user.fullName,
      createdAt: format(log.createdAt, 'dd.MM.yyyy HH:mm'),
    }));

    const rows = writer.stringifyRecords(data);

    const fileName = encodeURIComponent(
      `${journal.name} логи ${format(new Date(), 'dd-MM-yyyy HH:MM')}`.replace(
        /[^а-яa-z0-9їі]/gi,
        '_',
      ),
    );

    const content = headers + rows;

    return { content, fileName };
  }
}
