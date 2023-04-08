import { Controller, Get } from '@nestjs/common';
import { Permissions } from '../../decorators/permissions.decorator';
import { Permission } from '../../constants/permission';
import { DepartmentsService } from './departments.service';

@Controller('departments')
export class DepartmentsController {
  constructor(private readonly service: DepartmentsService) {}

  @Get()
  @Permissions(Permission.MANAGE_USERS)
  async findAll() {
    return this.service.findAll();
  }
}
