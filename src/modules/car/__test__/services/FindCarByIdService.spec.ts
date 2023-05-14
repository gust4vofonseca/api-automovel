import { ICarRepository } from "@modules/car/infra/repositories/ICarRepository";
import { FakeCarRepository } from "@modules/car/infra/repositories/fakes/FakeCarRepository";
import { Car } from "@modules/car/infra/typeorm/entities/Car";
import { v4 as uuidV4 } from 'uuid';
import AppError from "@shared/errors/AppError";
import { FindCarByIdService } from "@modules/car/services/FindCarByIdService";

let fakeCarRepository: ICarRepository;
let findCarByIdService: FindCarByIdService;
let car: Car;

describe("Find car by service test", () => {
  beforeEach(async () => {
    car = new Car();
    Object.assign(car, {
      id: uuidV4(),
      plate: "Fiat",
      brand: "HMT1234",
      color: "Cinza"
    });

    fakeCarRepository = new FakeCarRepository([car]);
    findCarByIdService = new FindCarByIdService(fakeCarRepository);
  })

  it ("it should be possible to search for a car by id", async () => {
    const data = await findCarByIdService.execute(car.id);

    expect(data).toEqual(car);
  })

  it ("should show an error when searching for a non-existent id", async () => {
    await expect(
      findCarByIdService.execute('1234')
    ).rejects.toEqual(new AppError(
      'Car does not exist!',
      400,
      'find_car',
    ));
  })
});
