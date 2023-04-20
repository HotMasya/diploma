import { Controller, Get } from '@nestjs/common';
import { Permission } from '../constants/permission';
import { Permissions } from '../decorators/permissions.decorator';
import { AdminService } from './admin.service';

@Controller('admin')
@Permissions(Permission.ADMIN)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get()
  async getInitialInfo() {
    return this.adminService.getInitialInfo();
  }
}
