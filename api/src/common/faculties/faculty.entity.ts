import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
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

  @Column({ length: 16 })
  shortName: string;

  @OneToMany(() => Student, (student) => student.faculty, { nullable: true })
  students: Student[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;
}
