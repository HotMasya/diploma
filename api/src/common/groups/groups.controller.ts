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

  @Post()
  @Permissions(Permission.CREATE_GROUPS)
  async create(@Body() dto: CreateGroupDto) {
    return this.service.create(dto);
  }

  @Patch(':id')
  @Permissions(Permission.UPDATE_GROUPS)
  async update(@Param() id: string, @Body() dto: UpdateGroupDto) {
    return this.service.update(+id, dto);
  }

  @Delete(':id')
  @Permissions(Permission.DELETE_GROUPS)
  async delete(@Param() id: string) {
    return this.service.delete(+id);
  }
}
