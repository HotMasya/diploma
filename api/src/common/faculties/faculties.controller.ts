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
import { FacultiesService } from './faculties.service';
import { AdminFindDto } from '../../dto/admin-find.dto';
import { CreateFacultyDto } from './dto/create-faculty.dto';
import { UpdateFacultyDto } from './dto/update-faculty.dto';

@Controller('faculties')
export class FacultiesController {
  constructor(private readonly service: FacultiesService) {}

  @Get()
  @Permissions(Permission.READ_FACULTIES)
  async findAll(@Query() dto: AdminFindDto) {
    return this.service.findAll(dto);
  }

  @Post()
  @Permissions(Permission.CREATE_FACULTIES)
  async create(@Body() dto: CreateFacultyDto) {
    return this.service.create(dto);
  }

  @Patch(':id')
  @Permissions(Permission.UPDATE_FACULTIES)
  async update(@Param() id: string, @Body() dto: UpdateFacultyDto) {
    return this.service.update(+id, dto);
  }

  @Delete(':id')
  @Permissions(Permission.DELETE_FACULTIES)
  async delete(@Param() id: string) {
    return this.service.delete(+id);
  }
}
