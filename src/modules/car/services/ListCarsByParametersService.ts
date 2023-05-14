
import { inject, injectable } from "tsyringe";
import { ICarRepository } from "../infra/repositories/ICarRepository";
import { Car } from "../infra/typeorm/entities/Car";

@injectable()
export class ListCarsByParametersService {

  constructor(
      @inject("CarRepository")
      private carRepository: ICarRepository,
  ) {}

  async execute(brand ?: string, color ?: string): Promise<Car[]> {
      const car = await this.carRepository.findParms(color, brand);

      return car;
  }
}
