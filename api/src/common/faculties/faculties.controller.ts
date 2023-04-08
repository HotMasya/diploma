import { Controller, Get } from '@nestjs/common';
import { Permissions } from '../../decorators/permissions.decorator';
import { Permission } from '../../constants/permission';
import { FacultiesService } from './faculties.service';

@Controller('faculties')
export class FacultiesController {
  constructor(private readonly service: FacultiesService) {}

  @Get()
  @Permissions(Permission.MANAGE_USERS)
  async findAll() {
    return this.service.findAll();
  }
}
