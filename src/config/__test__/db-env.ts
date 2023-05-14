import { dataSource } from "../../shared/infra/typeorm";

beforeAll(async () => {
  await dataSource.initialize();

  await dataSource.runMigrations();
});

afterAll(async () => {
  await dataSource.destroy();
});
