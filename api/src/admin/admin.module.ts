import { Module } from '@nestjs/common';
import { DepartmentsModule } from '../common/departments/departments.module';
import { FacultiesModule } from '../common/faculties/faculties.module';
import { GroupsModule } from '../common/groups/groups.module';
import { UsersModule } from '../users/users.module';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';

@Module({
  imports: [DepartmentsModule, FacultiesModule, GroupsModule, UsersModule],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
