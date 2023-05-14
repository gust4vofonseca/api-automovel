import { ICarRepository } from "@modules/car/infra/repositories/ICarRepository";
import { FakeCarRepository } from "@modules/car/infra/repositories/fakes/FakeCarRepository";
import { Car } from "@modules/car/infra/typeorm/entities/Car";
import { v4 as uuidV4 } from 'uuid';
import { ListCarsByParametersService } from "@modules/car/services/ListCarsByParametersService";

let fakeCarRepository: ICarRepository;
let listCarsByParametersService: ListCarsByParametersService;
let car: Car;

describe("List cars by parameters service test", () => {
  beforeEach(async () => {
    car = new Car();
    Object.assign(car, {
      id: uuidV4(),
      plate: "Fiat",
      brand: "HMT1234",
      color: "Cinza"
    });

    fakeCarRepository = new FakeCarRepository([car]);
    listCarsByParametersService = new ListCarsByParametersService(fakeCarRepository);
  })

  it ("it should be possible to search for a car", async () => {
    const data = await listCarsByParametersService.execute();

    expect(data).toEqual([car]);
  })

  it ("it should be possible to search for a car", async () => {
    const brand = car.brand;
    const color = car.color;

    const data = await listCarsByParametersService.execute(brand, color);

    expect(data).toEqual([car]);
  })
});
