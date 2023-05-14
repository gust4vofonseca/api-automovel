
import { app } from '@shared/infra/http/app';
import request from 'supertest';
import { v4 as uuidV4 } from 'uuid';
import 'dotenv/config';
import { EndCarUseService } from '@modules/carUse/services/EndCarUseService';
import { CarUse } from '@modules/carUse/infra/typeorm/entities/CarUse';

jest.mock('@modules/carUse/services/EndCarUseService');
const endCarUseService =
  EndCarUseService as jest.MockedClass<
    typeof EndCarUseService
  >;

describe('Update driver controller test', () => {
  it('it should be possible to search for a car by id', async () => {
    const carUse = new CarUse();
    endCarUseService.prototype.execute.mockResolvedValueOnce(carUse);

    const response = await request(app)
    .post("/car-use/end")
    .send({
      id: uuidV4(),
      end_date: new Date()
    });

    expect(response.status).toBe(200);
  });

  it('should return an error due to missing parameters', async () => {
    const carUse = new CarUse();
    endCarUseService.prototype.execute.mockResolvedValueOnce(carUse);

    const response = await request(app)
    .post("/car-use/end")
    .send({});

    expect(response.status).toBe(400);
  });
});
