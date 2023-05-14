import { ICarRepository } from "@modules/car/infra/repositories/ICarRepository";
import { FakeCarRepository } from "@modules/car/infra/repositories/fakes/FakeCarRepository";
import { Car } from "@modules/car/infra/typeorm/entities/Car";
import { DeleteCarService } from "@modules/car/services/DeleteCarService";
import { v4 as uuidV4 } from 'uuid';
import AppError from "@shared/errors/AppError";
import { ICarUseRepository } from "@modules/carUse/infra/repositories/ICarUseRepository";
import { CarUse } from "@modules/carUse/infra/typeorm/entities/CarUse";
import { Driver } from "@modules/driver/infra/typeorm/entities/Driver";
import { FakeCarUseRepository } from "@modules/carUse/infra/repositories/fake/FakeCarUseRepository";

let fakeCarRepository: ICarRepository;
let fakeCarUseRepository: ICarUseRepository;
let deleteCarService: DeleteCarService;
let car: Car;
let carUse: CarUse;
let driver: Driver;

describe("Delete car service test", () => {
  beforeEach(async () => {
    car = new Car();
    Object.assign(car, {
      id: uuidV4(),
      plate: "Fiat",
      brand: "HMT1234",
      color: "Cinza"
    });

    driver = new Driver();
    Object.assign(driver, {
      id: uuidV4(),
      name: "Gustavo"
    })

    carUse = new CarUse();
    Object.assign(carUse, {
      id: uuidV4(),
      start_date: new Date(),
      end_date: null,
      driver_id: driver.id,
      car_id: car.id,
      reason_for_use: "Teste"
    });

    fakeCarRepository = new FakeCarRepository([car]);
    fakeCarUseRepository = new FakeCarUseRepository([carUse]);
    deleteCarService = new DeleteCarService(fakeCarRepository, fakeCarUseRepository);
  })

  it ("Must be able to delete a car via id", async () => {
    await deleteCarService.execute(car.id);

    const carResponse = await fakeCarRepository.findById(car.id);

    expect(carResponse).toBeUndefined();
  })

  it ("An error should show when trying to delete a car with a non-existent id", async () => {
    await expect(
      deleteCarService.execute('1234')
    ).rejects.toEqual(new AppError(
      'Car does not exist!',
      400,
      'delete_car',
    ));
  })

});
