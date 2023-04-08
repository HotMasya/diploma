import { Controller, Get, Req } from '@nestjs/common';
import { Permissions } from '../../decorators/permissions.decorator';
import { Permission } from '../../constants/permission';
import { StudentsService } from './students.service';

@Controller('students')
export class StudentsController {
  constructor(private readonly service: StudentsService) {}

  @Get('me')
  @Permissions(Permission.ANY)
  async me(@Req() request) {
    return this.service.findMe(request.user.id);
  }
}
