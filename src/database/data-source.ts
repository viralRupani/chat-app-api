import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

const isProd = process.env.ENVIRONMENT === 'production';

export const typeOrmConfig: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT) || 5432,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
  entities: [__dirname + '/../**/*.entity.{ts,js}'],
  migrations: [__dirname + '/migrations/*.{ts,js}'],
  migrationsTableName: 'migrations',
  synchronize: false,
  logging: !isProd,
  extra: {
    max: 10,
  },
};

export const AppDataSource = new DataSource(typeOrmConfig);
