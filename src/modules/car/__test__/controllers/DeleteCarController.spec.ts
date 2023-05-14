
import { DeleteCarService } from '@modules/car/services/DeleteCarService';
import { app } from '@shared/infra/http/app';
import request from 'supertest';
import { v4 as uuidV4 } from 'uuid';

jest.mock('@modules/car/services/DeleteCarService');
const deleteCarServiceMock =
  DeleteCarService as jest.MockedClass<
    typeof DeleteCarService
  >;

describe('Delete car controller test', () => {
  it('Should be able to delete a car', async () => {
    deleteCarServiceMock.prototype.execute.mockResolvedValueOnce();

    const createCar = {
      id: uuidV4(),
      brand: "Fiat",
      color: "Cinza",
      plate: "HMT-3421"
  }

    const response = await request(app)
    .delete("/car/delete")
    .send(createCar.id);

    expect(response.status).toBe(200);
    expect(
      deleteCarServiceMock.prototype.execute,
    ).toHaveBeenCalledWith(undefined);
  });
});
