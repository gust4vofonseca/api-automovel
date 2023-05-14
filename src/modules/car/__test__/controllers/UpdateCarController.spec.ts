
import { app } from '@shared/infra/http/app';
import request from 'supertest';
import { v4 as uuidV4 } from 'uuid';
import 'dotenv/config';
import { Car } from '@modules/car/infra/typeorm/entities/Car';
import { UpdateCarService } from '@modules/car/services/UpdateCarService';

jest.mock('@modules/car/services/UpdateCarService');
const updateCarService =
  UpdateCarService as jest.MockedClass<
    typeof UpdateCarService
  >;

describe('Update car controller test', () => {
  it('it should be possible to change information', async () => {
    updateCarService.prototype.execute.mockResolvedValueOnce();

    const response = await request(app)
    .patch("/car/update")
    .send({
      id: uuidV4(),
      plate: "Volks"
    });

    expect(response.status).toBe(200);
  });
});
