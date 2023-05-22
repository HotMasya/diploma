import { AdminFindDto } from '../dto/admin-find.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { EmailService } from '../email/email.service';
import { hash, compare } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @Inject(forwardRef(() => EmailService))
    private readonly emailService: EmailService,
  ) {}

  static addSearchWhere(builder: SelectQueryBuilder<any>, search?: string) {
    if (!search) return;

    const params = {
      searchQuery: `%${search}%`,
    };

    builder.andWhere(
      `(CONCAT(user.lastName, ' ', user.firstName) ILIKE :searchQuery OR user.email ILIKE :searchQuery)`,
      params,
    );
  }

  async changePassword(password: string, userId: number) {
    const user = await this.usersRepository.findOneBy({ id: userId });

    if (!user) {
      throw new NotFoundException(null, 'Користувач не знайдений');
    }

    user.password = await hash(password, User.saltRounds);

    await this.usersRepository.save(user);

    await this.emailService.sendChangePasswordEmail(user.email, password);
  }

  async checkPassword(password: string, userId: number) {
    const user = await this.usersRepository.findOneBy({ id: userId });

    if (!user) {
      throw new NotFoundException(null, 'Користувач не знайдений');
    }

    const result = await compare(password, user.password);

    if (!result) throw new ConflictException(null, 'Пароль невірний');
  }

  async getTotalCount(search?: string) {
    const builder = this.usersRepository.createQueryBuilder('user').select();

    UsersService.addSearchWhere(builder, search);

    return builder.getCount();
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    let user = await this.findOneByEmail(createUserDto.email);

    if (user) {
      throw new ConflictException(
        null,
        'Користувач із такою електронною поштою вже зареєстрований',
      );
    }

    user = this.usersRepository.create(createUserDto);

    await this.usersRepository.save(user);

    delete user.password;

    return user;
  }

  async findAll(dto?: AdminFindDto): Promise<User[]> {
    const builder = this.usersRepository
      .createQueryBuilder('user')
      .select()
      .skip(dto.skip)
      .take(dto.take);

    if (dto.order) {
      const [field, order] = dto.order.split(' ');

      if (field === 'firstName') {
        builder.addOrderBy(
          `CONCAT(${builder.alias}.lastName, ${builder.alias}.firstName)`,
          order as 'ASC' | 'DESC',
        );
      } else {
        builder.orderBy(`${builder.alias}.${field}`, order as 'ASC' | 'DESC');
      }
    }

    UsersService.addSearchWhere(builder, dto.search);

    return builder.getMany();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({
      relations: ['teacher', 'teacher.departments', 'student'],
      where: {
        id,
      },
    });

    if (!user) throw new NotFoundException(null, 'Користувач не знайдений');

    delete user.password;

    return user;
  }

  async findOneByEmail(email: string): Promise<User> {
    return this.usersRepository.findOneBy({ email });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.usersRepository.findOne({
      relations: ['teacher', 'teacher.departments', 'student'],
      where: { id },
    });

    const updatedUser = { ...updateUserDto, updatedAt: new Date() };

    if (updateUserDto.password) {
      updatedUser.password = await hash(
        updateUserDto.password,
        User.saltRounds,
      );
    }

    await this.usersRepository.update(id, updatedUser);

    delete updatedUser.password;

    return { ...user, ...updatedUser } as User;
  }

  async remove(id: number) {
    const user = await this.usersRepository.findOneBy({
      id,
    });

    return this.usersRepository.remove(user);
  }

  async save(user: User): Promise<User> {
    return this.usersRepository.save(user);
  }
}
