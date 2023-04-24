import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { User } from '../../users/entities/user.entity';
import { Group } from '../groups/group.entity';
import { Faculty } from '../faculties/faculty.entity';

@Entity()
export class Student {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ length: 256 })
  name: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  @ManyToMany(() => Group, (group) => group.students, { nullable: true })
  group?: Group;

  @ManyToMany(() => Faculty, (faculty) => faculty.students, { nullable: true })
  faculty?: Faculty;

  @OneToOne(() => User, { nullable: true })
  user?: User;
}
