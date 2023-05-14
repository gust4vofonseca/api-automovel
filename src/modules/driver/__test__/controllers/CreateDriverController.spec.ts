import { Driver } from '@modules/driver/infra/typeorm/entities/Driver';
import { CreateDriverService } from '@modules/driver/services/CreateDriverService';
import { app } from '@shared/infra/http/app';
import request from 'supertest';

jest.mock('@modules/driver/services/CreateDriverService');
const createDriverServiceMock =
  CreateDriverService as jest.MockedClass<
    typeof CreateDriverService
  >;

describe('Create driver controller test', () => {
    it('Should be able to create a driver', async () => {
      const driver = new Driver()

      createDriverServiceMock.prototype.execute.mockResolvedValueOnce(driver);

      const createDriver = {
        name: "Gustavo",
    }

      const response = await request(app)
      .post("/driver/create")
      .send(createDriver);

      expect(response.status).toBe(201);
    });

    it('should return an error due to missing parameters', async () => {
      const driver = new Driver()
      
      createDriverServiceMock.prototype.execute.mockResolvedValueOnce(driver);


      const createDriver = {
        name: "Gustavo",
    }

      const response = await request(app)
      .post("/driver/create")
      .send();

      expect(response.status).toBe(400)
    });
});
