import { ICarDTO } from "../dtos/ICarDTO";
import { ICarRepository } from "../infra/repositories/ICarRepository";
import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

@injectable()
export class CreateCarService {
  constructor(
      @inject("CarRepository")
      private carRepository: ICarRepository,
  ) {}

  async execute({brand, color, plate}: ICarDTO): Promise<void> {
      const carExists = await this.carRepository.findByPlate(plate);

      if (carExists) {
        throw new AppError(
          'Car already exists!',
          400,
          'create_car',
        );
      }

      await this.carRepository.create({brand, color, plate});
  }
}
