
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
      const car = new Car()
      
      updateCarService.prototype.execute.mockResolvedValueOnce(car);

      const updateCar = {
        brand: "Fiat",
        color: "Cinza",
        plate: "HMT-3421",
        id: uuidV4()
      }

      const response = await request(app)
      .patch("/car/update")
      .send(updateCar);

      expect(response.status).toBe(200);
    });

    it('should return an error due to missing parameters', async () => {
      const car = new Car()
      
      updateCarService.prototype.execute.mockResolvedValueOnce(car);

      const updateCar = {
        brand: "Fiat",
        color: "Cinza",
      }
      const response = await request(app)
      .patch("/car/update")
      .send(updateCar);

      expect(response.status).toBe(400)
    });
});
