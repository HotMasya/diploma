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
import { TeachersService } from './teachers.service';
import { AdminFindDto } from '../../dto/admin-find.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';

@Controller('teachers')
export class TeachersController {
  constructor(private readonly service: TeachersService) {}

  @Get('me')
  @Permissions(Permission.ANY)
  async me(@Req() request) {
    return this.service.findMe(request.user.id);
  }

  @Get()
  @Permissions(Permission.ANY)
  async findAll(@Query() dto?: AdminFindDto) {
    return this.service.findAll(dto);
  }

  @Patch(':id')
  @Permissions(Permission.UPDATE_USERS)
  async update(@Param('id') id: string, @Body() dto: UpdateTeacherDto) {
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
}
