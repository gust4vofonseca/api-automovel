import { CarUse } from '@modules/carUse/infra/typeorm/entities/CarUse';
import { CreateCarUseService } from '@modules/carUse/services/CreateCarUseService';
import { app } from '@shared/infra/http/app';
import request from 'supertest';
import {v4 as uuidV4} from 'uuid'

jest.mock('@modules/carUse/services/CreateCarUseService');
const createCarUseServiceMock =
  CreateCarUseService as jest.MockedClass<
    typeof CreateCarUseService
  >;

describe('Create driver controller test', () => {
  it('Should be able to create a driver', async () => {
    const carUse = new CarUse();
    createCarUseServiceMock.prototype.execute.mockResolvedValueOnce(carUse);

    const createDriver = {
      start_date: new Date(),
      driver_id: uuidV4(),
      car_id: uuidV4(),
      reason_for_use: "Teste"
  }

    const response = await request(app)
    .post("/car-use/create")
    .send(createDriver);

    expect(response.status).toBe(201);
  });

  it('should return an error due to missing parameters', async () => {
    const carUse = new CarUse();
    createCarUseServiceMock.prototype.execute.mockResolvedValueOnce(carUse);

    const createDriver = {
      start_date: new Date(),
      driver_id: uuidV4(),
  }

    const response = await request(app)
    .post("/car-use/create")
    .send(createDriver);

    expect(response.status).toBe(400);
  });
});
