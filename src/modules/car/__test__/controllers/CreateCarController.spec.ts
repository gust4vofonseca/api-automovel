import { CreateCarService } from '@modules/car/services/CreateCarService';
import { app } from '@shared/infra/http/app';
import request from 'supertest';

jest.mock('@modules/car/services/CreateCarService');
const createCarServiceMock =
  CreateCarService as jest.MockedClass<
    typeof CreateCarService
  >;

describe('Create car controller test', () => {
  it('Should be able to create a car', async () => {
    createCarServiceMock.prototype.execute.mockResolvedValueOnce();

    const createCar = {
      brand: "Fiat",
      color: "Cinza",
      plate: "HMT-3421"
  }

    const response = await request(app)
    .post("/car/create")
    .send(createCar);

    expect(response.status).toBe(201);
    expect(
      createCarServiceMock.prototype.execute,
    ).toHaveBeenCalledWith(createCar);
  });
});
