import {
  BadRequestException,
  Controller,
  Get,
  Query,
  Res,
} from '@nestjs/common';

import { LogService } from './log.service';
import { Permission } from '../../constants/permission';
import { Permissions } from '../../decorators/permissions.decorator';
import { Response } from 'express';
import { FindLogsDto } from './dto/find-logs.dto';

@Controller('logs')
export class LogController {
  constructor(private readonly service: LogService) {}

  @Get()
  @Permissions(Permission.ANY)
  async getLogs(@Query() dto: FindLogsDto) {
    if (!dto?.journalId) {
      throw new BadRequestException(null, 'Ідентифікатор журнала не знайдено');
    }

    return this.service.getLogsByJournal(dto);
  }

  @Get('count')
  @Permissions(Permission.ANY)
  async getLogsCount(@Query('journalId') journalId: string) {
    if (!journalId) {
      throw new BadRequestException(null, 'Ідентифікатор журнала не знайдено');
    }

    return this.service.getLogsTotalCount(+journalId);
  }

  @Get('download')
  @Permissions(Permission.ANY)
  async downloadLogs(
    @Query('journalId') journalId: string,
    @Res() response: Response,
  ) {
    if (!journalId) {
      throw new BadRequestException(null, 'Ідентифікатор журнала не знайдено');
    }

    const { content, fileName } = await this.service.generateCsv(+journalId);

    response.set({
      'Access-Control-Expose-Headers': 'Content-Disposition',
      'Content-Type': 'text/csv',
      'Content-Disposition': `attachment; filename*=UTF-8\'\'${fileName}`,
    });

    response.end(content);
  }
}
