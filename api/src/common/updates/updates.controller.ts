import { Controller, Get, Req } from '@nestjs/common';
import { Permissions } from '../../decorators/permissions.decorator';
import { Permission } from '../../constants/permission';
import { UpdatesService } from './updates.service';

@Controller('teachers')
export class UpdatesController {
  constructor(private readonly service: UpdatesService) {}
}
