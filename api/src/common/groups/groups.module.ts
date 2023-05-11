import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Group } from './group.entity';
import { GroupsController } from './groups.controller';
import { GroupsService } from './groups.service';
import { Teacher } from '../teacher/teacher.entity';
import { Student } from '../students/student.entity';
import { JournalsModule } from '../journals/journals.module';

@Module({
  imports: [
    JournalsModule,
    TypeOrmModule.forFeature([Group, Teacher, Student]),
  ],
  controllers: [GroupsController],
  providers: [GroupsService],
  exports: [GroupsService],
})
export class GroupsModule {}
