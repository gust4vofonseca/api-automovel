
import { app } from '@shared/infra/http/app';
import request from 'supertest';
import { v4 as uuidV4 } from 'uuid';
import 'dotenv/config';
import { FindDriverByIdService } from '@modules/driver/services/FindDriverByIdService';
import { Driver } from '@modules/driver/infra/typeorm/entities/Driver';

jest.mock('@modules/driver/services/FindDriverByIdService');
const findDriverByIdService =
  FindDriverByIdService as jest.MockedClass<
    typeof FindDriverByIdService
  >;

describe('Find driver by id controller test', () => {
  it('it should be possible to search for a driver by id', async () => {
    const driver = new Driver();
    Object.assign(driver, {
      id: uuidV4(),
      name: "Gustavo"
    });

    findDriverByIdService.prototype.execute.mockResolvedValueOnce(driver);

    const id = driver.id;

    const response = await request(app)
    .get("/driver/find")
    .query(id);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(driver);
  });
});
