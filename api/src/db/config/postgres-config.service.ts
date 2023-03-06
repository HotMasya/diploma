import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import { ConfigService } from '@nestjs/config';
import { TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

@Injectable()
export class PostgresConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createTypeOrmOptions(): PostgresConnectionOptions {
    return {
      type: 'postgres',
      host: this.configService.getOrThrow('PSQL_HOST'),
      port: +this.configService.getOrThrow('PSQL_PORT'),
      username: this.configService.getOrThrow('PSQL_USERNAME'),
      password: this.configService.getOrThrow('PSQL_PASSWORD'),
      database: this.configService.getOrThrow('PSQL_DATABASE'),
      entities: ['dist/**/*.entity.js'],
      migrations: ['src/db/migrations/*.ts'],
    };
  }
}
