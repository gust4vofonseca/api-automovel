
import { DeleteDriverService } from '@modules/driver/services/DeleteDriverService';
import { app } from '@shared/infra/http/app';
import request from 'supertest';
import { v4 as uuidV4 } from 'uuid';

jest.mock('@modules/driver/services/DeleteDriverService');
const deleteDriverServiceMock =
  DeleteDriverService as jest.MockedClass<
    typeof DeleteDriverService
  >;

describe('Delete driver controller test', () => {
  it('Should be able to delete a driver', async () => {
    deleteDriverServiceMock.prototype.execute.mockResolvedValueOnce();

    const createDriver = {
      id: uuidV4(),
      name: "Gustavo"
  }

    const response = await request(app)
    .delete("/driver/delete")
    .send(createDriver.id);

    expect(response.status).toBe(200);
    expect(
      deleteDriverServiceMock.prototype.execute,
    ).toHaveBeenCalledWith(undefined);
  });
});
