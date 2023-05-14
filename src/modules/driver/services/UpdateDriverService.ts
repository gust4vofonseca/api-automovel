
import { inject, injectable } from "tsyringe";
import { IDriverRepository } from "../infra/repositories/IDriverRepository";
import AppError from "@shared/errors/AppError";
import { Driver } from "../infra/typeorm/entities/Driver";

@injectable()
export class UpdateDriverService {
  constructor(
      @inject("DriverRepository")
      private driverRepository: IDriverRepository,
  ) {}

  async execute(id: string, name: string): Promise<Driver> {
    const driver = await this.driverRepository.findById(id);

    if (!driver) {
      throw new AppError(
        'Driver does not exist!',
        400,
        'update_driver',
      );
    }

    driver.name = name;    

    const saveDriver = await this.driverRepository.update(driver);

    return saveDriver;
  }
}
