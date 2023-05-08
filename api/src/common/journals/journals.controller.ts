import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  Res,
} from '@nestjs/common';

import { Permissions } from '../../decorators/permissions.decorator';
import { Permission } from '../../constants/permission';
import { JournalsService } from './journals.service';
import { FindJournalsDto } from './dto/find-journals.dto';
import { CreateJournalDto } from './dto/create-journal.dto';
import { User } from '../../users/entities/user.entity';
import { PartialUpdateDto } from './dto/partial-update.dto';
import { UpdateJournaDto } from './dto/update-journal.dto';
import { UpdateCellDto } from './dto/update-cell.dto';
import { Response } from 'express';

@Controller('journals')
export class JournalsController {
  constructor(private readonly service: JournalsService) {}

  @Get()
  @Permissions(Permission.ANY)
  async findAll(
    @Req() request: Request & { user: User },
    @Query() dto?: FindJournalsDto,
  ) {
    return this.service.findAll(request.user, dto);
  }

  @Get(':id/csv')
  @Permissions(Permission.ANY)
  async downloadJournalCsv(
    @Req() request: Request & { user: User },
    @Res() response: Response,
    @Param('id') id: string,
  ) {
    const { content, fileName } = await this.service.generateCsv(
      request.user,
      +id,
    );

    response.set({
      'Access-Control-Expose-Headers': 'Content-Disposition',
      'Content-Type': 'text/csv',
      'Content-Disposition': `attachment; filename*=UTF-8\'\'${fileName}`,
    });

    response.end(content);
  }

  @Get('count/total')
  @Permissions(Permission.ANY)
  async totalCount(
    @Req() request: Request & { user: User },
    @Query('search') search?: string,
  ) {
    return this.service.totalCount(request.user, search);
  }

  @Get('grades')
  @Permissions(Permission.ANY)
  async getStudentGrades(
    @Req() request: Request & { user: User },
    @Query() dto?: FindJournalsDto,
  ) {
    return this.service.getStudentGrades(request.user, dto);
  }

  @Get('grades/:id')
  @Permissions(Permission.ANY)
  async getStudentGradeDetails(
    @Req() request: Request & { user: User },
    @Param('id') id: string,
  ) {
    return this.service.getStudentGradeDetails(request.user, +id);
  }

  @Get(':id')
  @Permissions(Permission.ANY)
  async findOne(
    @Req() request: Request & { user: User },
    @Param('id') id: string,
  ) {
    return this.service.findOne(request.user, +id);
  }

  @Patch(':id')
  @Permissions(Permission.ANY)
  async partialUpdate(
    @Req() request: Request & { user: User },
    @Body() dto: PartialUpdateDto,
    @Param('id') id: string,
  ) {
    return this.service.partialUpdate(request.user, +id, dto);
  }

  @Patch(':id/cells')
  @Permissions(Permission.ANY)
  async updateCell(
    @Req() request: Request & { user: User },
    @Body() dto: UpdateCellDto,
    @Param('id') id: string,
  ) {
    return this.service.updateCell(request.user, +id, dto);
  }

  @Post(':id')
  async update(
    @Req() request: Request & { user: User },
    @Body() dto: UpdateJournaDto,
    @Param('id') id: string,
  ) {
    return this.service.update(request.user, +id, dto);
  }

  @Post()
  @Permissions(Permission.ANY)
  async create(
    @Req() request: Request & { user: User },
    @Body() dto: CreateJournalDto,
  ) {
    return this.service.create(request.user, dto);
  }

  @Delete(':id')
  @Permissions(Permission.ANY)
  async remove(
    @Req() request: Request & { user: User },
    @Param('id') id: string,
  ) {
    return this.service.remove(request.user, +id);
  }
}
