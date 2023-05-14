import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { ICarUseRepository } from "../infra/repositories/ICarUseRepository";
import { ICarUseDTO } from "../dtos/ICarUseDTO";
import { ICarRepository } from "@modules/car/infra/repositories/ICarRepository";
import { IDriverRepository } from "@modules/driver/infra/repositories/IDriverRepository";
import { CarUse } from "../infra/typeorm/entities/CarUse";

@injectable()
export class CreateCarUseService {
  constructor(
      @inject("CarUseRepository")
      private carUseRepository: ICarUseRepository,

      @inject("CarRepository")
      private carRepository: ICarRepository,

      @inject("DriverRepository")
      private driverRepository: IDriverRepository,
  ) {}

  async execute({car_id, driver_id, reason_for_use, start_date}: ICarUseDTO): Promise<CarUse> {

      const carInUse = await this.carUseRepository.findByCarAndEndDateNull(car_id);

      if (carInUse) {
        throw new AppError(
          'Car in use!',
          400,
          'create_car_use',
        );
      }

      const busyDriver = await this.carUseRepository.findByDriverAndEndDateNull(driver_id);

      if (busyDriver) {
        throw new AppError(
          'Busy driver',
          400,
          'create_car_use',
        );
      }

      const driverExists = await this.driverRepository.findById(driver_id);

      if (!driverExists) {
        throw new AppError(
          'Driver does not exist!',
          400,
          'create_car_use',
        );
      }

      const carExists = await this.carRepository.findById(car_id);

      if (!carExists) {
        throw new AppError(
          'Car does not exist!',
          400,
          'create_car_use',
        );
      }

      const carUse = await this.carUseRepository.create({car_id, driver_id, reason_for_use, start_date});

      return carUse;
  }
}
