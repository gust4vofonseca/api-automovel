
import { inject, injectable } from "tsyringe";
import { IDriverRepository } from "../infra/repositories/IDriverRepository";
import { Driver } from "../infra/typeorm/entities/Driver";
import AppError from "@shared/errors/AppError";
import { ICreateDriverDTO } from "../dtos/ICreateDriverDTO";


@injectable()
export class CreateDriverService {
  constructor(
      @inject("DriverRepository")
      private driverRepository: IDriverRepository,
  ) {}

  async execute({name, document}: ICreateDriverDTO): Promise<Driver> {
      const documentAlreadyExists = await this.driverRepository.findByDocument(document);

      if (documentAlreadyExists) {
        throw new AppError(
          'Document already exists!',
          400,
          'create_driver',
        );
      }

      const driver = await this.driverRepository.create({name, document});

      return driver;
  }
}
