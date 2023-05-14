
import { app } from '@shared/infra/http/app';
import request from 'supertest';
import { v4 as uuidV4 } from 'uuid';
import 'dotenv/config';
import { EndCarUseService } from '@modules/carUse/services/EndCarUseService';

jest.mock('@modules/carUse/services/EndCarUseService');
const endCarUseService =
  EndCarUseService as jest.MockedClass<
    typeof EndCarUseService
  >;

describe('Update driver controller test', () => {
  it('it should be possible to search for a car by id', async () => {
    endCarUseService.prototype.execute.mockResolvedValueOnce();

    const response = await request(app)
    .post("/car-use/end")
    .send({
      id: uuidV4(),
      end_date: new Date()
    });

    expect(response.status).toBe(200);
  });
});
