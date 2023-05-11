import { hash } from 'bcrypt';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { Permission } from '../../constants/permission';
import * as _ from 'lodash';
import { Teacher } from '../../common/teacher/teacher.entity';
import { Student } from '../../common/students/student.entity';

@Entity()
export class User {
  constructor(props: Partial<User> = {}) {
    _.assign(this, props);
  }

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

  @Column({ default: 0 })
  permissions: number;

  @Column({ type: 'boolean', default: false })
  verified: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  @OneToOne(() => Teacher, (teacher) => teacher.user)
  teacher: Teacher;

  @OneToOne(() => Student, (student) => student.user)
  student: Student;

  get fullName() {
    return [this.lastName, this.firstName].filter(Boolean).join(' ');
  }

  static readonly saltRounds = 10;

  static async fromDto(dto: CreateUserDto): Promise<User> {
    const user = new User(dto);
    user.password = await hash(user.password, User.saltRounds);
    return user;
  }

  hasPermissions(...permissions: Permission[]) {
    const mergedPermissions = _.reduce(
      permissions,
      (acc, permission) => (acc |= permission),
      0,
    );

    return (this.permissions | mergedPermissions) == this.permissions;
  }
}
