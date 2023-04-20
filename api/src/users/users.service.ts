import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { hash } from 'bcrypt';

import {
  DeleteResult,
  Repository,
  SelectQueryBuilder,
  UpdateResult,
} from 'typeorm';
import { FindUsersDto } from './dto/find-users.dto';
import { EmailService } from '../email/email.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @Inject(forwardRef(() => EmailService))
    private readonly emailService: EmailService,
  ) {}

  static addSearchWhere(builder: SelectQueryBuilder<User>, search?: string) {
    if (!search) return;

    const params = {
      searchQuery: `%${search}%`,
    };

    builder
      .where(
        `CONCAT(user.firstName, ' ', user.lastName) ILIKE :searchQuery`,
        params,
      )
      .orWhere('user.email ILIKE :searchQuery', params);
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

  async findAll(dto?: FindUsersDto): Promise<User[]> {
    const builder = this.usersRepository
      .createQueryBuilder('user')
      .select()
      .skip(dto.skip)
      .take(dto.take);

    if (dto.order) {
      const [field, order] = dto.order.split(' ');

      if (field === 'firstName') {
        builder.addOrderBy(
          `${builder.alias}.firstName`,
          order as 'ASC' | 'DESC',
        );
        builder.addOrderBy(
          `${builder.alias}.lastName`,
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
    return this.usersRepository.findOneBy({ id });
  }

  async findOneByEmail(email: string): Promise<User> {
    return this.usersRepository.findOneBy({ email });
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<UpdateResult> {
    return this.usersRepository.update(id, updateUserDto);
  }

  async remove(id: number): Promise<DeleteResult> {
    return this.usersRepository.delete(id);
  }

  async save(user: User): Promise<User> {
    return this.usersRepository.save(user);
  }
}
