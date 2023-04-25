import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
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

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  @ManyToOne(() => Group, (group) => group.students, {
    nullable: true,
    eager: true,
  })
  @JoinColumn({ name: 'groupid' })
  group?: Group;

  @ManyToOne(() => Faculty, (faculty) => faculty.students, {
    nullable: true,
    eager: true,
  })
  @JoinColumn({ name: 'facultyid' })
  faculty?: Faculty;

  @OneToOne(() => User, { nullable: false })
  @JoinColumn({ name: 'userid' })
  user: User;
}
