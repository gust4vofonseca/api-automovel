
import { inject, injectable } from "tsyringe";
import { IDriverRepository } from "../infra/repositories/IDriverRepository";
import AppError from "@shared/errors/AppError";
import { Driver } from "../infra/typeorm/entities/Driver";
import { IDriverDTO } from "../dtos/IDriverDTO";

@injectable()
export class UpdateDriverService {
  constructor(
      @inject("DriverRepository")
      private driverRepository: IDriverRepository,
  ) {}

  async execute({document, id, name}: IDriverDTO): Promise<Driver> {
    const driver = await this.driverRepository.findById(id);

    if (!driver) {
      throw new AppError(
        'Driver does not exist!',
        400,
        'update_driver',
      );
    }
    
    if (driver.document !== document) {
      const documentAlreadyExists = await this.driverRepository.findByDocument(document);

      if (documentAlreadyExists) {
        throw new AppError(
          'Document already exists!',
          400,
          'create_driver',
        );
      } else {
        driver.document = document;
      }
    }

    if (driver.name !== name) {
      driver.name = name;    
    }

    const saveDriver = await this.driverRepository.update(driver);

    return saveDriver;
  }
}
