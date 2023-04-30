import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JournalsController } from './journals.controller';
import { JournalsService } from './journals.service';
import { Journal } from './journal.entity';
import { Group } from '../groups/group.entity';
import { Teacher } from '../teacher/teacher.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Journal, Group, Teacher])],
  controllers: [JournalsController],
  providers: [JournalsService],
  exports: [JournalsService],
})
export class JournalsModule {}
