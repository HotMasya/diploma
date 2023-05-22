import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Req,
  ForbiddenException,
} from '@nestjs/common';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Permissions } from '../decorators/permissions.decorator';
import { Permission } from '../constants/permission';
import { Public } from '../decorators/public.decorator';
import { EmailService } from '../email/email.service';
import { AdminFindDto } from '../dto/admin-find.dto';

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
  @Permissions(Permission.READ_USERS)
  async findAll(@Query() dto: AdminFindDto) {
    return this.usersService.findAll(dto);
  }

  @Get('count/total')
  @Permissions(Permission.READ_USERS)
  async totalCount(@Query('search') search?: string) {
    return this.usersService.getTotalCount(search);
  }

  @Get('me')
  @Permissions(Permission.ANY)
  findMe(@Req() req: Request & { user?: User }) {
    return this.usersService.findOne(req.user.id);
  }

  @Get(':id')
  @Permissions(Permission.READ_USERS)
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Post(':id/password')
  @Permissions(Permission.ANY)
  async changePassword(
    @Req() req: Request & { user: User },
    @Body('password') password: string,
    @Param('id') id: string,
  ) {
    if (
      +id === req.user.id ||
      req.user.hasPermissions(Permission.UPDATE_USERS) ||
      req.user.hasPermissions(Permission.ADMIN)
    ) {
      return this.usersService.changePassword(password, +id);
    } else {
      throw new ForbiddenException(null, 'У вас недостатньо прав');
    }
  }

  @Post(':id/password/check')
  @Permissions(Permission.ANY)
  async checkPassword(
    @Req() req: Request & { user: User },
    @Body('password') password: string,
    @Param('id') id: string,
  ) {
    if (
      +id === req.user.id ||
      req.user.hasPermissions(Permission.UPDATE_USERS) ||
      req.user.hasPermissions(Permission.ADMIN)
    ) {
      return this.usersService.checkPassword(password, +id);
    } else {
      throw new ForbiddenException(null, 'У вас недостатньо прав');
    }
  }

  @Patch(':id')
  @Permissions(Permission.UPDATE_USERS)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @Permissions(Permission.DELETE_USERS)
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
