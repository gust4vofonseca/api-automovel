import { dataSource } from '../../shared/infra/typeorm';

require('ts-node/register');
require('tsconfig-paths/register');

export default async () => {
  await dataSource.initialize();

  await dataSource.runMigrations();
};