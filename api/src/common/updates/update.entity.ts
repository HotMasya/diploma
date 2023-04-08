import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { User } from '../../users/entities/user.entity';

@Entity()
export class Update {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ length: 256 })
  topic: string;

  @Column({ length: 512 })
  body: string;

  @Column({
    type: 'jsonb',
    array: false,
    nullable: true,
    default: () => "'{}'",
  })
  data?: any;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  @OneToOne(() => User)
  user: User;
}
