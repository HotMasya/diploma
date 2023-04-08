import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Student } from '../students/student.entity';

@Entity()
export class Faculty {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ length: 256 })
  name: string;

  @ManyToMany(() => Student, (student) => student.faculties)
  students: Student[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;
}
