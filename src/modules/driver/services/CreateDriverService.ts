
import { inject, injectable } from "tsyringe";
import { IDriverRepository } from "../infra/repositories/IDriverRepository";
import { Driver } from "../infra/typeorm/entities/Driver";
import AppError from "@shared/errors/AppError";


@injectable()
export class CreateDriverService {
  constructor(
      @inject("DriverRepository")
      private driverRepository: IDriverRepository,
  ) {}

  async execute(name: string): Promise<Driver> {
      const driver = await this.driverRepository.create(name);

      return driver;
  }
}
