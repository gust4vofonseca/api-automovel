
import { inject, injectable } from "tsyringe";
import { ICarUseRepository } from "../infra/repositories/ICarUseRepository";
import { CarUse } from "../infra/typeorm/entities/CarUse";
import AppError from "@shared/errors/AppError";
import { IDriverRepository } from "@modules/driver/infra/repositories/IDriverRepository";

@injectable()
export class FindCarUseByDriverService {
  constructor(
      @inject("CarUseRepository")
      private carUseRepository: ICarUseRepository,

      @inject("DriverRepository")
      private driverRepository: IDriverRepository,
  ) {}

  async execute(id: string): Promise<CarUse[]> {
      const driver = await this.driverRepository.findById(id);

      if (!driver) {
        throw new AppError(
          'Driver does not exist!',
          400,
          'find_by_dryver_car_use',
        );
      }

      const carUse = await this.carUseRepository.findByDriver(id);

      return carUse;
  }
}
