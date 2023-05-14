
import { inject, injectable } from "tsyringe";
import { IDriverRepository } from "../infra/repositories/IDriverRepository";
import AppError from "@shared/errors/AppError";
import { ICarUseRepository } from "@modules/carUse/infra/repositories/ICarUseRepository";

@injectable()
export class DeleteDriverService {
  constructor(
      @inject("DriverRepository")
      private driverRepository: IDriverRepository,

      @inject("CarUseRepository")
      private carUseRepository: ICarUseRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const driver = await this.driverRepository.findById(id);

    if (!driver) {
      throw new AppError(
        'Driver does not exist!',
        400,
        'delete_driver',
      );
    }

    const carsUse = await this.carUseRepository.findByDriver(driver.id);

    for (const carUse of carsUse) {
      await this.carUseRepository.delete(carUse.id);
    }

    await this.driverRepository.delete(id);
  }
}
