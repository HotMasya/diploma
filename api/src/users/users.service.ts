import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  DeleteResult,
  FindManyOptions,
  Repository,
  UpdateResult,
} from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    let user = await this.findOneByEmail(createUserDto.email);

    if (user) {
      throw new ConflictException(null, 'User already exists');
    }

    user = this.usersRepository.create(createUserDto);
    this.usersRepository.save(user);
    return user;
  }

  async findAll(options?: FindManyOptions): Promise<User[]> {
    return this.usersRepository.find(options);
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
}
