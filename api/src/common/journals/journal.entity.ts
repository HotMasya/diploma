import {
  Column as TableColumn,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Group } from '../groups/group.entity';
import { Teacher } from '../teacher/teacher.entity';
import { GridColumn } from './interfaces/grid-column.interface';
import { GridRow } from './interfaces/grid-row.interface';

@Entity()
export class Journal {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @TableColumn({ length: 256 })
  name: string;

  @TableColumn({ length: 512, nullable: true })
  description?: string;

  @TableColumn({
    type: 'jsonb',
    default: () => "'[]'",
    nullable: false,
  })
  columns: GridColumn[];

  @TableColumn({
    type: 'jsonb',
    default: () => "'[]'",
    nullable: false,
  })
  rows: GridRow[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  @ManyToOne(() => Group, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'group_id' })
  group: Group;

  @ManyToOne(() => Teacher, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'teacher_id' })
  teacher: Teacher;
}
