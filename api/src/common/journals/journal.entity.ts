import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Group } from '../groups/group.entity';
import { Teacher } from '../teacher/teacher.entity';

export class ColumnData {}

@Entity()
export class Journal {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ length: 256 })
  name: string;

  @Column({ length: 512 })
  description: string;

  @Column({
    type: 'jsonb',
    array: false,
    default: () => "'[]'",
    nullable: false,
  })
  columns: ColumnData[];

  @Column({
    type: 'jsonb',
    array: false,
    default: () => "'[]'",
    nullable: false,
  })
  data: string[][];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  @ManyToOne(() => Group)
  groups: Group[];

  @OneToOne(() => Teacher)
  teacher: Teacher;
}
