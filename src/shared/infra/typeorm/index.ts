import { DataSource } from 'typeorm';
import 'dotenv/config';

export const dataSource = new DataSource({
  name: 'default',
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: process.env.POSTGRESQL_PASSWORD,
  database: process.env.NODE_ENV === 'dev' ? 'postgres' :'postgres_test',
  synchronize: false,
  logging: false,
  migrationsTableName: 'migration',
  entities: ['src/**/**/infra/typeorm/entities/*.ts'],
  migrations: ['src/shared/infra/typeorm/migrations/*.ts'],
});