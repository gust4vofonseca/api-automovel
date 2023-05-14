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
    createCarUseServiceMock.prototype.execute.mockResolvedValueOnce();

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
});
