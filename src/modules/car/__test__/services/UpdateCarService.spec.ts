import { ICarRepository } from "@modules/car/infra/repositories/ICarRepository";
import { FakeCarRepository } from "@modules/car/infra/repositories/fakes/FakeCarRepository";
import { Car } from "@modules/car/infra/typeorm/entities/Car";
import { v4 as uuidV4 } from 'uuid';
import AppError from "@shared/errors/AppError";
import { UpdateCarService } from "@modules/car/services/UpdateCarService";

let fakeCarRepository: ICarRepository;
let updateCarService: UpdateCarService;
let car: Car;

describe("Update car service test", () => {
  beforeEach(async () => {
    car = new Car();
    Object.assign(car, {
      id: uuidV4(),
      plate: "Fiat",
      brand: "HMT1234",
      color: "Cinza"
    });

    fakeCarRepository = new FakeCarRepository([car]);
    updateCarService = new UpdateCarService(fakeCarRepository);
  })

  it ("It should be possible to change car information", async () => {
    await updateCarService.execute({
      id: car.id,
      color: "Branco",
      plate: "HMT1478",
      brand: "Volks",
    });
  })

  it ("It should show an error when trying to change non-existent id information", async () => {
    await expect(
      updateCarService.execute({
        id: '1234',
        color: "Branco",
        plate: car.plate,
        brand: car.brand,
      })
    ).rejects.toEqual(new AppError(
      'Car does not exist!',
      400,
      'update_car',
    ));
  })

});
