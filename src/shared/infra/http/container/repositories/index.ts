import { container } from "tsyringe";
import { ICarRepository } from "@modules/car/infra/repositories/ICarRepository";
import { CarRepository } from "@modules/car/infra/typeorm/repositories/CarRepository";
import { ICarUseRepository } from "@modules/carUse/infra/repositories/ICarUseRepository";
import { CarUseRepository } from "@modules/carUse/infra/typeorm/repositories/CarUseRepository";
import { IDriverRepository } from "@modules/driver/infra/repositories/IDriverRepository";
import { DriverRepository } from "@modules/driver/infra/typeorm/repositories/DriverRepository";

container.registerSingleton<ICarRepository>(
  'CarRepository',
  CarRepository,
);

container.registerSingleton<IDriverRepository>(
  'DriverRepository',
  DriverRepository,
);

container.registerSingleton<ICarUseRepository>(
  'CarUseRepository',
  CarUseRepository,
);
