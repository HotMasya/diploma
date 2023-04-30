import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { Permissions } from '../../decorators/permissions.decorator';
import { Permission } from '../../constants/permission';
import { JournalsService } from './journals.service';
import { FindJournalsDto } from './dto/find-journals.dto';
import { CreateJournalDto } from './dto/create-journal.dto';
import { User } from '../../users/entities/user.entity';

@Controller('journals')
export class JournalsController {
  constructor(private readonly service: JournalsService) {}

  @Get()
  @Permissions(Permission.ANY)
  async findAll(
    @Req() request: Request & { user: User },
    @Query() dto?: FindJournalsDto,
  ) {
    return this.service.findAll(request.user, dto);
  }

  @Post()
  @Permissions(Permission.ANY)
  async create(
    @Req() request: Request & { user: User },
    @Body() dto: CreateJournalDto,
  ) {
    return this.service.create(request.user, dto);
  }

  @Delete(':id')
  @Permissions(Permission.ANY)
  async remove(
    @Req() request: Request & { user: User },
    @Param('id') id: string,
  ) {
    return this.service.remove(request.user, +id);
  }
}
