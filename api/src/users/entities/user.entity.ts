import { assign } from 'lodash';
import { hash } from 'bcrypt';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { Permission } from '../../constants/permission';
import reduce from 'lodash/reduce';

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

  @Column({ type: 'bigint', default: 0 })
  permissions: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  static readonly saltRounds = 10;

  static async fromDto(dto: CreateUserDto): Promise<User> {
    const user = new User();
    assign(user, dto);
    user.password = await hash(user.password, User.saltRounds);
    return user;
  }

  hasPermissios(...permissions: Permission[]) {
    const mergedPermissions = reduce(
      permissions,
      (acc, permission) => (acc |= permission),
      0,
    );

    return (this.permissions | mergedPermissions) == this.permissions;
  }
}
