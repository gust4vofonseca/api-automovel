
import { ICarDTO } from "../dtos/ICarDTO";
import { inject, injectable } from "tsyringe";
import { ICarRepository } from "../infra/repositories/ICarRepository";
import AppError from "@shared/errors/AppError";

@injectable()
export class UpdateCarService {

  constructor(
      @inject("CarRepository")
      private carRepository: ICarRepository,
  ) {}

  async execute({brand, color, plate, id}: ICarDTO): Promise<void> {
      const car = await this.carRepository.findById(id);

      if (!car) {
        throw new AppError(
          'Car does not exist!',
          400,
          'update_car',
        );
      }

      if (car.brand !== brand) {
        car.brand = brand;
      }

      if (car.color !== color) {
        car.color = color;
      }

      if (car.plate !== plate) {
        car.plate = plate;
      }

      await this.carRepository.update(car);
  }
}
