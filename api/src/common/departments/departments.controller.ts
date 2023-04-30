import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

import { Permissions } from '../../decorators/permissions.decorator';
import { Permission } from '../../constants/permission';
import { DepartmentsService } from './departments.service';
import { AdminFindDto } from '../../dto/admin-find.dto';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';

@Controller('departments')
export class DepartmentsController {
  constructor(private readonly service: DepartmentsService) {}

  @Get()
  @Permissions(Permission.READ_DEPARTMENTS)
  async findAll(@Query() dto: AdminFindDto) {
    return this.service.findAll(dto);
  }

  @Post()
  @Permissions(Permission.CREATE_DEPARTMENTS)
  async create(@Body() dto: CreateDepartmentDto) {
    return this.service.create(dto);
  }

  @Patch(':id')
  @Permissions(Permission.UPDATE_DEPARTMENTS)
  async update(@Param('id') id: string, @Body() dto: UpdateDepartmentDto) {
    return this.service.update(+id, dto);
  }

  @Delete(':id')
  @Permissions(Permission.DELETE_DEPARTMENTS)
  async delete(@Param('id') id: string) {
    return this.service.delete(+id);
  }

  @Get('count/total')
  @Permissions(Permission.READ_DEPARTMENTS)
  async totalCount(@Query('search') search?: string) {
    return this.service.getTotalCount(search);
  }
}
