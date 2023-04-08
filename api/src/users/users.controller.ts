import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
} from '@nestjs/common';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Permissions } from '../decorators/permissions.decorator';
import { Permission } from '../constants/permission';
import { FindManyOptions } from 'typeorm';
import { Public } from '../decorators/public.decorator';
import { EmailService } from '../email/email.service';

@Controller('users')
@Permissions(Permission.ADMIN)
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly emailService: EmailService,
  ) {}

  @Post()
  @Public()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    const user = await User.fromDto(createUserDto);
    await this.emailService.sendConfirmationEmail(user.email);
    return this.usersService.create(user);
  }

  @Get()
  findAll(@Body() options: FindManyOptions) {
    return this.usersService.findAll(options);
  }

  @Get('me')
  @Permissions(Permission.ANY)
  findMe(@Request() req) {
    return req.user;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
