
import { app } from '@shared/infra/http/app';
import request from 'supertest';
import { v4 as uuidV4 } from 'uuid';
import 'dotenv/config';
import { Car } from '@modules/car/infra/typeorm/entities/Car';
import { ListCarsByParametersService } from '@modules/car/services/ListCarsByParametersService';

jest.mock('@modules/car/services/ListCarsByParametersService');
const listCarsByParametersService =
  ListCarsByParametersService as jest.MockedClass<
    typeof ListCarsByParametersService
  >;

describe('List cars by parameters controller test', () => {
  it('it should be possible to search for a car', async () => {
    const car = new Car();
    
    listCarsByParametersService.prototype.execute.mockResolvedValueOnce([car]);

    const response = await request(app)
    .get("/car/list")
    .query({});

    expect(response.status).toBe(200);
    expect(response.body).toEqual([car]);
  });

  it('it should be possible to search for a car', async () => {
    const car = new Car();
    Object.assign(car, {
      id: uuidV4(),
      plate: "Fiat",
      brand: "HMT1234",
      color: "Cinza"
    });

    listCarsByParametersService.prototype.execute.mockResolvedValueOnce([car]);

    const brand = "fiat";
    const color = "Cinza"

    const response = await request(app)
    .get("/car/list")
    .query({brand, color});

    expect(response.status).toBe(200);
    expect(response.body).toEqual([car]);
  });
});
