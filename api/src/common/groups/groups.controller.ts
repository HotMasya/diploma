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
import { GroupsService } from './groups.service';
import { AdminFindDto } from '../../dto/admin-find.dto';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';

@Controller('groups')
export class GroupsController {
  constructor(private readonly service: GroupsService) {}

  @Get()
  @Permissions(Permission.READ_GROUPS)
  async findAll(@Query() dto: AdminFindDto) {
    return this.service.findAll(dto);
  }

  @Get(':id')
  @Permissions(Permission.READ_GROUPS)
  async findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Get('count/total')
  @Permissions(Permission.READ_GROUPS)
  async totalCount(@Query('search') search?: string) {
    return this.service.getTotalCount(search);
  }

  @Post()
  @Permissions(Permission.CREATE_GROUPS)
  async create(@Body() dto: CreateGroupDto) {
    return this.service.create(dto);
  }

  @Patch(':id')
  @Permissions(Permission.UPDATE_GROUPS)
  async update(@Param('id') id: string, @Body() dto: UpdateGroupDto) {
    return this.service.update(+id, dto);
  }

  @Delete(':id')
  @Permissions(Permission.DELETE_GROUPS)
  async delete(@Param('id') id: string) {
    return this.service.delete(+id);
  }

  @Delete(':id/curator/remove')
  @Permissions(Permission.UPDATE_GROUPS)
  async removeCurator(@Param('id') id: string) {
    return this.service.removeCurator(+id);
  }

  @Post(':id/students')
  @Permissions(Permission.UPDATE_GROUPS)
  async addStudents(
    @Param('id') groupId: string,
    @Body('studentIds') studentIds: number[],
  ) {
    return this.service.addStudents(+groupId, studentIds);
  }

  @Delete(':groupId/students/:studentId')
  @Permissions(Permission.UPDATE_GROUPS)
  async removeStudent(
    @Param('groupId') groupId: string,
    @Param('studentId') studentId: string,
  ) {
    return this.service.removeStudent(+groupId, +studentId);
  }
}
