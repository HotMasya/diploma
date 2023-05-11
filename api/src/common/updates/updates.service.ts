import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Update } from './update.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UpdatesService {
  constructor(
    @InjectRepository(Update)
    private readonly updatesRepository: Repository<Update>,
  ) {}

  async findAll() {
    return await this.updatesRepository.find();
  }
}
