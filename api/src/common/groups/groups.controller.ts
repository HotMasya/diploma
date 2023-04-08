import { Controller, Get } from '@nestjs/common';
import { Permissions } from '../../decorators/permissions.decorator';
import { Permission } from '../../constants/permission';
import { GroupsService } from './groups.service';

@Controller('groups')
export class GroupsController {
  constructor(private readonly service: GroupsService) {}

  @Get()
  @Permissions(Permission.MANAGE_USERS)
  async findAll() {
    return this.service.findAll();
  }
}
