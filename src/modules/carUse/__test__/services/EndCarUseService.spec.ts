import { ICarRepository } from "@modules/car/infra/repositories/ICarRepository";
import { FakeCarRepository } from "@modules/car/infra/repositories/fakes/FakeCarRepository";
import { Car } from "@modules/car/infra/typeorm/entities/Car";
import { ICarUseRepository } from "@modules/carUse/infra/repositories/ICarUseRepository";
import { FakeCarUseRepository } from "@modules/carUse/infra/repositories/fake/FakeCarUseRepository";
import { CarUse } from "@modules/carUse/infra/typeorm/entities/CarUse";
import { CreateCarUseService } from "@modules/carUse/services/CreateCarUseService";
import { EndCarUseService } from "@modules/carUse/services/EndCarUseService";
import { IDriverRepository } from "@modules/driver/infra/repositories/IDriverRepository";
import { FakeDriverRepository } from "@modules/driver/infra/repositories/fake/FakeDriverRepository";
import { Driver } from "@modules/driver/infra/typeorm/entities/Driver";
import AppError from "@shared/errors/AppError";
import {v4 as uuidV4} from 'uuid'

let fakeDriverRepository: IDriverRepository;
let fakeCarRepository: ICarRepository;
let fakeCarUseRepository: ICarUseRepository;

let endCarUseService: EndCarUseService;
let carUse: CarUse;
let car: Car;
let driver: Driver;

describe("End car use service test", () => {
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

    fakeDriverRepository = new FakeDriverRepository([driver ]);
    fakeCarRepository = new FakeCarRepository([car ]);
    fakeCarUseRepository = new FakeCarUseRepository([carUse]);
    endCarUseService = new EndCarUseService(fakeCarUseRepository,);
  })

  it ("it should be possible to finalize the car in use", async () => {
      const id = carUse.id;
      const end_date = new Date();

      const response = await endCarUseService.execute(id, end_date);

      expect(response.end_date).toEqual(end_date);
  })

  it ("should show an error when the id of the car in use is not found", async () => {
    const id = '1234';
    const end_date = new Date();

    await expect(
      endCarUseService.execute(id, end_date)
    ).rejects.toEqual(new AppError(
      'Car not found in use!',
      400,
      'end_car_use',
    ));
  })
});
