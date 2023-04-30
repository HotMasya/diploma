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
} from '@nestjs/common';

import { Permissions } from '../../decorators/permissions.decorator';
import { Permission } from '../../constants/permission';
import { StudentsService } from './students.service';
import { UpdateStudentDto } from './dto/update-student.dto';
import { FindStudentsDto } from './dto/find-students.dto';
import * as _ from 'lodash';

@Controller('students')
export class StudentsController {
  constructor(private readonly service: StudentsService) {}

  @Get()
  @Permissions(Permission.READ_USERS)
  async findAll(@Query() dto: FindStudentsDto) {
    if (dto.excludeIds?.length) {
      dto.excludeIds = _.map(dto.excludeIds, Number);
    }

    return this.service.findAll(dto);
  }

  @Get('me')
  @Permissions(Permission.ANY)
  async me(@Req() request) {
    return this.service.findMe(request.user.id);
  }

  @Patch(':id')
  @Permissions(Permission.UPDATE_USERS)
  async update(@Param('id') id: string, @Body() dto: UpdateStudentDto) {
    return this.service.update(+id, dto);
  }

  @Post()
  @Permissions(Permission.UPDATE_USERS)
  async create(@Body('userId') userId: number) {
    return this.service.create(userId);
  }

  @Delete(':id')
  @Permissions(Permission.UPDATE_USERS)
  async delete(@Param('id') id: string) {
    return this.service.delete(+id);
  }

  @Get('count/total')
  async countTotal(@Query('search') search?: string) {
    return this.service.getTotalCount(search);
  }
}
