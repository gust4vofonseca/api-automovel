
import { inject, injectable } from "tsyringe";
import { IDriverRepository } from "../infra/repositories/IDriverRepository";
import { Driver } from "../infra/typeorm/entities/Driver";
import AppError from "@shared/errors/AppError";

@injectable()
export class ListDriversService {
  constructor(
      @inject("DriverRepository")
      private driverRepository: IDriverRepository,
  ) {}

  async execute(name?: string): Promise<Driver[]> {
    name = name ? name : undefined;
    
    const drivers = await this.driverRepository.findByParms(name);

    return drivers;
  }
}
