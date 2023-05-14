import { inject, injectable } from "tsyringe";
import { ICarRepository } from "../infra/repositories/ICarRepository";
import AppError from "@shared/errors/AppError";
import { ICarUseRepository } from '@modules/carUse/infra/repositories/ICarUseRepository';
@injectable()
export class DeleteCarService {
  constructor(
      @inject("CarRepository")
      private carRepository: ICarRepository,

      @inject("CarUseRepository")
      private carUseRepository: ICarUseRepository,
  ) {}

  async execute(id: string): Promise<void> {
      const carExists = await this.carRepository.findById(id);

      if (!carExists) {
        throw new AppError(
          'Car does not exist!',
          400,
          'delete_car',
        );
      }

      const carsUse = await this.carUseRepository.findByCar(carExists.id);

      for (const carUse of carsUse) {
        await this.carUseRepository.delete(carUse.id);
      }

      await this.carRepository.deleteById(id);
  }
}
