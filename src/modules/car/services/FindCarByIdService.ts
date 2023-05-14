
import { inject, injectable } from "tsyringe";
import { ICarRepository } from "../infra/repositories/ICarRepository";
import AppError from "@shared/errors/AppError";
import { Car } from "../infra/typeorm/entities/Car";

@injectable()
export class FindCarByIdService {
  constructor(
      @inject("CarRepository")
      private carRepository: ICarRepository,
  ) {}

  async execute(id: string): Promise<Car> {
      const car = await this.carRepository.findById(id);

      if (!car) {
        throw new AppError(
          'Car does not exist!',
          400,
          'find_car',
        );
      }

      return car;
  }
}
