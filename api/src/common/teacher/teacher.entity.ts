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
import { Department } from '../departments/department.entity';
import { Group } from '../groups/group.entity';

@Entity()
export class Teacher {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ length: 256 })
  name: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  @ManyToMany(() => Department, (department) => department.teachers, {
    nullable: true,
  })
  departments: Department[];

  @ManyToMany(() => Group, (group) => group.curator, { nullable: true })
  groups: Group[];

  @OneToOne(() => User, { nullable: true })
  user?: User;
}
