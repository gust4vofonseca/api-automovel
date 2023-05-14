import { ICarRepository } from "../infra/repositories/ICarRepository";
import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { Car } from "../infra/typeorm/entities/Car";
import { ICreateCarDTO } from "../dtos/ICreateCarDTO";

@injectable()
export class CreateCarService {
  constructor(
      @inject("CarRepository")
      private carRepository: ICarRepository,
  ) {}

  async execute({brand, color, plate}: ICreateCarDTO): Promise<Car> {
      const carExists = await this.carRepository.findByPlate(plate);

      if (carExists) {
        throw new AppError(
          'Car already exists!',
          400,
          'create_car',
        );
      }

      const car = await this.carRepository.create({brand, color, plate});

      return car;
  }
}
