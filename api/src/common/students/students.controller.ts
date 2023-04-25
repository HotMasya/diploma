import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common';

import { Permissions } from '../../decorators/permissions.decorator';
import { Permission } from '../../constants/permission';
import { StudentsService } from './students.service';
import { UpdateStudentDto } from './dto/update-student.dto';

@Controller('students')
export class StudentsController {
  constructor(private readonly service: StudentsService) {}

  @Get('me')
  @Permissions(Permission.ANY)
  async me(@Req() request) {
    return this.service.findMe(request.user.id);
  }

  @Patch(':id')
  @Permissions(Permission.UPDATE_USERS)
  async update(@Param('id') id: string, @Body() dto: UpdateStudentDto) {
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
