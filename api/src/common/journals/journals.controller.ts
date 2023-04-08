import { Controller, Get } from '@nestjs/common';
import { Permissions } from '../../decorators/permissions.decorator';
import { Permission } from '../../constants/permission';
import { JournalsService } from './journals.service';

@Controller('journals')
export class JournalsController {
  constructor(private readonly service: JournalsService) {}

  @Get()
  @Permissions(Permission.MANAGE_USERS)
  async findAll() {
    return this.service.findAll();
  }
}
