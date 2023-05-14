
import { inject, injectable } from "tsyringe";
import { IDriverRepository } from "../infra/repositories/IDriverRepository";
import AppError from "@shared/errors/AppError";

@injectable()
export class UpdateDriverService {
  constructor(
      @inject("DriverRepository")
      private driverRepository: IDriverRepository,
  ) {}

  async execute(id: string, name: string): Promise<void> {
    const driver = await this.driverRepository.findById(id);

    if (!driver) {
      throw new AppError(
        'Driver does not exist!',
        400,
        'update_driver',
      );
    }

    if (driver.name !== name) {
      driver.name = name;
    }

    await this.driverRepository.update(driver);
  }
}
