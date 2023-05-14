
import { app } from '@shared/infra/http/app';
import request from 'supertest';
import { v4 as uuidV4 } from 'uuid';
import 'dotenv/config';
import { Car } from '@modules/car/infra/typeorm/entities/Car';
import { ListDriversService } from '@modules/driver/services/ListDriversService';
import { Driver } from '@modules/driver/infra/typeorm/entities/Driver';

jest.mock('@modules/driver/services/ListDriversService');
const listDriversService =
  ListDriversService as jest.MockedClass<
    typeof ListDriversService
  >;

describe('List drivers controller test', () => {
  it('it should be possible to search for a driver', async () => {
    const driver = new Driver();
    Object.assign(driver, {
      id: uuidV4(),
      name: "Gustavo"
    });

    listDriversService.prototype.execute.mockResolvedValueOnce([driver]);

    const response = await request(app)
    .get("/driver/list")
    .send();

    expect(response.status).toBe(200);
    expect(response.body).toEqual([driver]);
  });
});
