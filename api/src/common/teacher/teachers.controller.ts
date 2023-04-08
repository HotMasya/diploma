import { Controller, Get, Req } from '@nestjs/common';
import { Permissions } from '../../decorators/permissions.decorator';
import { Permission } from '../../constants/permission';
import { TeachersService } from './teachers.service';

@Controller('teachers')
export class TeachersController {
  constructor(private readonly service: TeachersService) {}

  @Get('me')
  @Permissions(Permission.ANY)
  async me(@Req() request) {
    return this.service.findMe(request.user.id);
  }
}
