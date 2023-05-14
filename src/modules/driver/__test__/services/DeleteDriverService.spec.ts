import { Car } from "@modules/car/infra/typeorm/entities/Car";
import { DeleteCarService } from "@modules/car/services/DeleteCarService";
import { v4 as uuidV4 } from 'uuid';
import AppError from "@shared/errors/AppError";
import { ICarUseRepository } from "@modules/carUse/infra/repositories/ICarUseRepository";
import { CarUse } from "@modules/carUse/infra/typeorm/entities/CarUse";
import { Driver } from "@modules/driver/infra/typeorm/entities/Driver";
import { FakeCarUseRepository } from "@modules/carUse/infra/repositories/fake/FakeCarUseRepository";
import { DeleteDriverService } from "@modules/driver/services/DeleteDriverService";
import { FakeDriverRepository } from "@modules/driver/infra/repositories/fake/FakeDriverRepository";
import { IDriverRepository } from "@modules/driver/infra/repositories/IDriverRepository";

let fakeDriverRepository: IDriverRepository;
let fakeCarUseRepository: ICarUseRepository;
let deleteDriverService: DeleteDriverService;
let car: Car;
let carUse: CarUse;
let driver: Driver;

describe("Delete driver service test", () => {
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
      name: "Gustavo",
      document: "135648"
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

    fakeDriverRepository = new FakeDriverRepository([driver]);
    fakeCarUseRepository = new FakeCarUseRepository([carUse]);
    deleteDriverService = new DeleteDriverService(fakeDriverRepository, fakeCarUseRepository);
  })

  it ("Must be able to delete a driver via id", async () => {
    await deleteDriverService.execute(driver.id);

    const response = await fakeDriverRepository.findById(driver.id);

    expect(response).toBeUndefined();
  })

  it ("An error should show when trying to delete a driver with a non-existent id", async () => {
    await expect(
      deleteDriverService.execute('1234')
    ).rejects.toEqual(new AppError(
      'Driver does not exist!',
      400,
      'delete_driver',
    ));
  })

});
