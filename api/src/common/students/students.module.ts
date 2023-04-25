import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './student.entity';
import { StudentsController } from './students.controller';
import { StudentsService } from './students.service';
import { Group } from '../groups/group.entity';
import { Faculty } from '../faculties/faculty.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Student, Group, Faculty])],
  controllers: [StudentsController],
  providers: [StudentsService],
  exports: [StudentsService],
})
export class StudentsModule {}
