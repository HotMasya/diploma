import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import { ConfigService } from '@nestjs/config';
import { TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import * as path from 'path';

@Injectable()
export class PostgresConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createTypeOrmOptions(): PostgresConnectionOptions {
    return {
      type: 'postgres',
      host: this.configService.get('PSQL_HOST'),
      port: +this.configService.get('PSQL_PORT'),
      username: this.configService.get('PSQL_USERNAME'),
      password: this.configService.get('PSQL_PASSWORD'),
      database: this.configService.get('PSQL_DATABASE'),
      entities: ['dist/**/*.entity.{js,ts}'],
      migrations: [path.resolve(__dirname, '../migrations/*.ts')],
    };
  }
}
