import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { User } from '../../users/entities/user.entity';
import { Department } from '../departments/department.entity';
import { Group } from '../groups/group.entity';

@Entity()
export class Teacher {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  @ManyToMany(() => Department, (department) => department.teachers, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinTable({
    name: 'teacher_department',
    joinColumn: { name: 'teacherid' },
    inverseJoinColumn: { name: 'departmentid' },
  })
  departments: Department[];

  @OneToMany(() => Group, (group) => group.curator, {
    nullable: true,
  })
  groups: Group[];

  @OneToOne(() => User, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userid' })
  user: User;
}
