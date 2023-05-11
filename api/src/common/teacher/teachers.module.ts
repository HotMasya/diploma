import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Teacher } from './teacher.entity';
import { TeachersController } from './teachers.controller';
import { TeachersService } from './teachers.service';
import { Department } from '../departments/department.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Department, Teacher])],
  controllers: [TeachersController],
  providers: [TeachersService],
  exports: [TeachersService],
})
export class TeachersModule {}
