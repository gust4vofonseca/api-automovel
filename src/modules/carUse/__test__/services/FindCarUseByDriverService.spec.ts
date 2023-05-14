import { ICarRepository } from "@modules/car/infra/repositories/ICarRepository";
import { FakeCarRepository } from "@modules/car/infra/repositories/fakes/FakeCarRepository";
import { Car } from "@modules/car/infra/typeorm/entities/Car";
import { ICarUseRepository } from "@modules/carUse/infra/repositories/ICarUseRepository";
import { FakeCarUseRepository } from "@modules/carUse/infra/repositories/fake/FakeCarUseRepository";
import { CarUse } from "@modules/carUse/infra/typeorm/entities/CarUse";
import { FindCarUseByDriverService } from "@modules/carUse/services/FindCarUseByDriverService";
import { IDriverRepository } from "@modules/driver/infra/repositories/IDriverRepository";
import { FakeDriverRepository } from "@modules/driver/infra/repositories/fake/FakeDriverRepository";
import { Driver } from "@modules/driver/infra/typeorm/entities/Driver";
import {v4 as uuidV4} from 'uuid'

let fakeDriverRepository: IDriverRepository;
let fakeCarRepository: ICarRepository;
let fakeCarUseRepository: ICarUseRepository;

let findCarUseByDriverService: FindCarUseByDriverService;
let carUse: CarUse;
let car: Car;
let driver: Driver;

describe("Find car use by driver service test", () => {
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

    fakeDriverRepository = new FakeDriverRepository([driver ]);
    fakeCarRepository = new FakeCarRepository([car ]);
    fakeCarUseRepository = new FakeCarUseRepository([carUse]);
    findCarUseByDriverService = new FindCarUseByDriverService(fakeCarUseRepository,);
  })

  it ("it should be possible to search for the driver id", async () => {
      await findCarUseByDriverService.execute(driver.id);
  })
});
