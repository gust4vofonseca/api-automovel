
import { inject, injectable } from "tsyringe";
import { IDriverRepository } from "../infra/repositories/IDriverRepository";
import { Driver } from "../infra/typeorm/entities/Driver";
import AppError from "@shared/errors/AppError";

@injectable()
export class FindDriverByIdService {
  constructor(
      @inject("DriverRepository")
      private driverRepository: IDriverRepository,
  ) {}

  async execute(id: string): Promise<Driver> {
    const driver = await this.driverRepository.findById(id);

    if (!driver) {
      throw new AppError(
        'Driver does not exist!',
        400,
        'find_driver',
      );
    }

    return driver;
  }
}
