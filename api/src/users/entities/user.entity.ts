import _, { assign } from 'lodash';
import { hash } from 'bcrypt';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { Permission } from './permission.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ length: 256, unique: true })
  email: string;

  @Column({ length: 256 })
  password: string;

  @Column({ length: 256 })
  firstName: string;

  @Column({ length: 256 })
  lastName: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  @ManyToMany(() => Permission)
  @JoinTable()
  permissions: Set<Permission>;

  static readonly saltRounds = 10;

  static async fromDto(dto: CreateUserDto): Promise<User> {
    const user = new User();
    assign(user, dto);
    user.password = await hash(user.password, User.saltRounds);
    return user;
  }
}
