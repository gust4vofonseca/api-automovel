import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { ICarUseRepository } from "../infra/repositories/ICarUseRepository";
import { CarUse } from "../infra/typeorm/entities/CarUse";

@injectable()
export class EndCarUseService {
  constructor(
      @inject("CarUseRepository")
      private carUseRepository: ICarUseRepository,
  ) {}

  async execute(id: string, end_date: Date): Promise<CarUse> {


      const carUse = await this.carUseRepository.findById(id);

      if (!carUse || carUse.end_date !== null) {
        throw new AppError(
          'Car not found in use!',
          400,
          'end_car_use',
        );
      }

      carUse.end_date = new Date(end_date);

      const saveCarUse = await this.carUseRepository.update(carUse);

      return saveCarUse;
  }
}
