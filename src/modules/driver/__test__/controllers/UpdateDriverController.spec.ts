
import { app } from '@shared/infra/http/app';
import request from 'supertest';
import { v4 as uuidV4 } from 'uuid';
import 'dotenv/config';
import { UpdateDriverService } from '@modules/driver/services/UpdateDriverService';
import { Driver } from '@modules/driver/infra/typeorm/entities/Driver';

jest.mock('@modules/driver/services/UpdateDriverService');
const updateDriverService =
  UpdateDriverService as jest.MockedClass<
    typeof UpdateDriverService
  >;

describe('Update driver controller test', () => {
  it('it should be possible update a car', async () => {
    const driver = new Driver()
    updateDriverService.prototype.execute.mockResolvedValueOnce(driver);

    const response = await request(app)
    .patch("/driver/update")
    .send({
      id: uuidV4(),
      name: "Gustavo Fonseca"
    });

    expect(response.status).toBe(200);
  });

    it('should return an error due to missing parameters', async () => {
      const driver = new Driver()
      updateDriverService.prototype.execute.mockResolvedValueOnce(driver);
  
      const response = await request(app)
      .patch("/driver/update")
      .send({
        name: "Gustavo Fonseca"
      });

      expect(response.status).toBe(400)
    });
});
