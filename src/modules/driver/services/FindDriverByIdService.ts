
import { inject, injectable } from "tsyringe";
import { IDriverRepository } from "../infra/repositories/IDriverRepository";
import { Driver } from "../infra/typeorm/entities/Driver";

@injectable()
export class FindDriverByIdService {
  constructor(
      @inject("DriverRepository")
      private driverRepository: IDriverRepository,
  ) {}

  async execute(id: string): Promise<Driver> {
    const driver = await this.driverRepository.findById(id);

    return driver;
  }
}
