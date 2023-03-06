import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { DataSource } from 'typeorm';
import { PostgresConfigService } from './config/postgres-config.service';

config();

const configService = new ConfigService();
const postgresConfigService = new PostgresConfigService(configService);

export default new DataSource(postgresConfigService.createTypeOrmOptions());
