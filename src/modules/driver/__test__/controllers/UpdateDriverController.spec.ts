
import { app } from '@shared/infra/http/app';
import request from 'supertest';
import { v4 as uuidV4 } from 'uuid';
import 'dotenv/config';
import { UpdateDriverService } from '@modules/driver/services/UpdateDriverService';

jest.mock('@modules/driver/services/UpdateDriverService');
const updateDriverService =
  UpdateDriverService as jest.MockedClass<
    typeof UpdateDriverService
  >;

describe('Update driver controller test', () => {
  it('it should be possible update a car', async () => {
    updateDriverService.prototype.execute.mockResolvedValueOnce();

    const response = await request(app)
    .patch("/driver/update")
    .send({
      id: uuidV4(),
      name: "Gustavo Fonseca"
    });

    expect(response.status).toBe(200);
  });
});
