import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { PermissionsGuard } from './auth/guards/permissions.guard';
import { DatabaseModule } from './db/database.module';
import { UsersModule } from './users/users.module';
import { EmailModule } from './email/email.module';
import { DepartmentsModule } from './common/departments/departments.module';
import { FacultiesModule } from './common/faculties/faculties.module';
import { GroupsModule } from './common/groups/groups.module';
import { JournalsModule } from './common/journals/journals.module';
import { StudentsModule } from './common/students/students.module';
import { TeachersModule } from './common/teacher/teachers.module';
import { UpdatesModule } from './common/updates/updates.module';
import { AdminModule } from './admin/admin.module';
import { LogModule } from './common/log/log.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AdminModule,
    DatabaseModule,
    UsersModule,
    AuthModule,
    EmailModule,

    // Common
    DepartmentsModule,
    FacultiesModule,
    GroupsModule,
    LogModule,
    JournalsModule,
    StudentsModule,
    TeachersModule,
    UpdatesModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: PermissionsGuard,
    },
  ],
})
export class AppModule {}
