
import { app } from '@shared/infra/http/app';
import request from 'supertest';
import { v4 as uuidV4 } from 'uuid';
import 'dotenv/config';
import { Driver } from '@modules/driver/infra/typeorm/entities/Driver';
import { FindCarUseByDriverService } from '@modules/carUse/services/FindCarUseByDriverService';
import { CarUse } from '@modules/carUse/infra/typeorm/entities/CarUse';

jest.mock('@modules/carUse/services/FindCarUseByDriverService');
const findCarUseByDriverService =
  FindCarUseByDriverService as jest.MockedClass<
    typeof FindCarUseByDriverService
  >;

describe('Find driver by id controller test', () => {
  it('it should be possible to search for a driver by id', async () => {
    const carUse = new CarUse();
    Object.assign(carUse, {
      id: uuidV4(),
      start_date: new Date(),
      end_date: null,
      driver_id: uuidV4(),
      car_id: uuidV4(),
      reason_for_use: "Teste"
    });

    findCarUseByDriverService.prototype.execute.mockResolvedValueOnce([carUse]);

    const id = carUse.id;

    const response = await request(app)
    .get("/car-use/find")
    .query(id);

    expect(response.status).toBe(200);
  });
});
