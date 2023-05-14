
import { app } from '@shared/infra/http/app';
import request from 'supertest';
import { v4 as uuidV4 } from 'uuid';
import 'dotenv/config';
import { FindCarByIdService } from '@modules/car/services/FindCarByIdService';
import { Car } from '@modules/car/infra/typeorm/entities/Car';

jest.mock('@modules/car/services/FindCarByIdService');
const findCarByIdService =
  FindCarByIdService as jest.MockedClass<
    typeof FindCarByIdService
  >;

describe('Find car by id controller test', () => {
  it('it should be possible to search for a car by id', async () => {
    const car = new Car();
    Object.assign(car, {
      id: uuidV4(),
      plate: "Fiat",
      brand: "HMT1234",
      color: "Cinza"
    });

    findCarByIdService.prototype.execute.mockResolvedValueOnce(car);

    const id = car.id;

    const response = await request(app)
    .get("/car/find")
    .query({id});

    expect(response.status).toBe(200);
    expect(response.body).toEqual(car);
  });

  it('should return an error due to missing parameters', async () => {
    const car = new Car();

    findCarByIdService.prototype.execute.mockResolvedValueOnce(car);

    const response = await request(app)
    .get("/car/find")
    .query({});

    expect(response.status).toBe(400);
  });
});
