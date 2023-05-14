
import { app } from '@shared/infra/http/app';
import request from 'supertest';
import { v4 as uuidV4 } from 'uuid';
import 'dotenv/config';
import { CarUse } from '@modules/carUse/infra/typeorm/entities/CarUse';
import { ListCarUseService } from '@modules/carUse/services/ListCarUseService';

jest.mock('@modules/carUse/services/ListCarUseService');
const listCarUseService =
  ListCarUseService as jest.MockedClass<
    typeof ListCarUseService
  >;

describe('List drivers controller test', () => {
  it('it should be possible to search for a driver', async () => {
    const carUse = new CarUse();
    Object.assign(carUse, {
      id: uuidV4(),
      start_date: new Date(),
      end_date: null,
      driver_id: uuidV4(),
      car_id: uuidV4(),
      reason_for_use: "Teste"
    });

    listCarUseService.prototype.execute.mockResolvedValueOnce([carUse]);

    const response = await request(app)
    .get("/car-use/list")
    .send();

    expect(response.status).toBe(200);
  });
});
