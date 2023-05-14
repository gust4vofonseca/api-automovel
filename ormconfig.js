import 'dotenv/config';

module.exports = [
  {
    name: 'default',
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: process.env.POSTGRESQL_PASSWORD,
    database: process.env.NODE_ENV === 'test' ? 'postgres_test' :'postgres',
    synchronize: false,
    logging: false,
    migrationsTableName: 'migration',
    entities: 'src/modules/**/infra/typeorm/entities/*{.ts,.js}',
    migrations: 'src/shared/infra/typeorm/migrations/*{.ts,.js}',
  }
]
