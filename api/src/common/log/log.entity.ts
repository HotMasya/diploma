import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Student } from '../students/student.entity';
import { Teacher } from '../teacher/teacher.entity';
import { Journal } from '../journals/journal.entity';

@Entity()
export class Log {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => Student, { onDelete: 'SET NULL', eager: true })
  @JoinColumn({ name: 'student_id' })
  student: Student;

  @ManyToOne(() => Teacher, { onDelete: 'SET NULL', eager: true })
  @JoinColumn({ name: 'teacher_id' })
  teacher: Teacher;

  @ManyToOne(() => Journal, { onDelete: 'CASCADE' })
  journal: Journal;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Column()
  columnId: string;

  @Column()
  columnTitle: string;

  @Column()
  index: number;

  @Column()
  message: string;
}
