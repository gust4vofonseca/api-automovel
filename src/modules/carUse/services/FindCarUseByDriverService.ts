
import { inject, injectable } from "tsyringe";
import { ICarUseRepository } from "../infra/repositories/ICarUseRepository";
import { CarUse } from "../infra/typeorm/entities/CarUse";

@injectable()
export class FindCarUseByDriverService {
  constructor(
      @inject("CarUseRepository")
      private carUseRepository: ICarUseRepository,
  ) {}

  async execute(id: string): Promise<CarUse[]> {
      const carUse = await this.carUseRepository.findByDriver(id);

      return carUse;
  }
}
