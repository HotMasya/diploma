import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JournalsController } from './journals.controller';
import { JournalsService } from './journals.service';
import { Journal } from './journal.entity';
import { Group } from '../groups/group.entity';
import { Teacher } from '../teacher/teacher.entity';
import { Student } from '../students/student.entity';
import { User } from '../../users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Journal, Group, Teacher, Student, User])],
  controllers: [JournalsController],
  providers: [JournalsService],
  exports: [JournalsService],
})
export class JournalsModule {}
