import { ICarRepository } from "@modules/car/infra/repositories/ICarRepository";
import { FakeCarRepository } from "@modules/car/infra/repositories/fakes/FakeCarRepository";
import { Car } from "@modules/car/infra/typeorm/entities/Car";
import { ICarUseRepository } from "@modules/carUse/infra/repositories/ICarUseRepository";
import { FakeCarUseRepository } from "@modules/carUse/infra/repositories/fake/FakeCarUseRepository";
import { CarUse } from "@modules/carUse/infra/typeorm/entities/CarUse";
import { CreateCarUseService } from "@modules/carUse/services/CreateCarUseService";
import { IDriverRepository } from "@modules/driver/infra/repositories/IDriverRepository";
import { FakeDriverRepository } from "@modules/driver/infra/repositories/fake/FakeDriverRepository";
import { Driver } from "@modules/driver/infra/typeorm/entities/Driver";
import AppError from "@shared/errors/AppError";
import {v4 as uuidV4} from 'uuid'

let fakeDriverRepository: IDriverRepository;
let fakeCarRepository: ICarRepository;
let fakeCarUseRepository: ICarUseRepository;

let createCarUSeService: CreateCarUseService;
let carUse: CarUse;
let car: Car;
let driver: Driver;
let car2: Car;
let driver2: Driver;

describe("Create car use service test", () => {
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

    car2 = new Car();
    Object.assign(car2, {
      id: uuidV4(),
      plate: "Fiat",
      brand: "HMT1232",
      color: "Cinza"
    });

    driver2 = new Driver();
    Object.assign(driver2, {
      id: uuidV4(),
      name: "Gustavo"
    })

    carUse = new CarUse();
    Object.assign(carUse, {
      id: uuidV4(),
      start_date: new Date(),
      end_date: null,
      driver_id: driver2.id,
      car_id: car2.id,
      reason_for_use: "Teste"
    });

    fakeDriverRepository = new FakeDriverRepository([driver, driver2]);
    fakeCarRepository = new FakeCarRepository([car, car2]);
    fakeCarUseRepository = new FakeCarUseRepository([carUse]);
    createCarUSeService = new CreateCarUseService(fakeCarUseRepository, fakeCarRepository, fakeDriverRepository);
  })

  it ("It should be possible to create a car use", async () => {
    const carUse = {
      car_id: car.id,
      driver_id: driver.id,
      reason_for_use: "Teste",
      start_date: new Date()
    };

    await createCarUSeService.execute(carUse);
  })

  it ("should show a car error in use", async () => {
    const carUse = {
      car_id: car2.id,
      driver_id: driver2.id,
      reason_for_use: "Teste",
      start_date: new Date()
    };

    await expect(
      createCarUSeService.execute(carUse)
    ).rejects.toEqual(new AppError(
      'Car in use!',
      400,
      'create_car_use',
    ));
    })

    it ("should show a driver error in use", async () => {
      const carUse = {
        car_id: car.id,
        driver_id: driver2.id,
        reason_for_use: "Teste",
        start_date: new Date()
      };

      await expect(
        createCarUSeService.execute(carUse)
      ).rejects.toEqual(new AppError(
        'Busy driver',
        400,
        'create_car_use',
      ));
    })


    it ("should show an unknown driver id error", async () => {
      const carUse = {
        car_id: car.id,
        driver_id: '12347',
        reason_for_use: "Teste",
        start_date: new Date()
      };

      await expect(
        createCarUSeService.execute(carUse)
      ).rejects.toEqual(new AppError(
        'Driver does not exist!',
        400,
        'create_car_use',
      ));
    })

    it ("should show an unknown car id error", async () => {
      const carUse = {
        car_id: '1234',
        driver_id: driver.id,
        reason_for_use: "Teste",
        start_date: new Date()
      };

      await expect(
        createCarUSeService.execute(carUse)
      ).rejects.toEqual(new AppError(
        'Car does not exist!',
        400,
        'create_car_use',
      ));
    })
});
