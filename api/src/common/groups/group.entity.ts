import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Student } from '../students/student.entity';
import { Teacher } from '../teacher/teacher.entity';

@Entity()
export class Group {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ length: 256 })
  name: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  @OneToMany(() => Student, (student) => student.group, { nullable: true })
  students: Student[];

  @ManyToOne(() => Teacher, (teacher) => teacher.groups, {
    nullable: true,
    eager: true,
  })
  @JoinColumn({ name: 'curatorid' })
  curator: Teacher;
}
