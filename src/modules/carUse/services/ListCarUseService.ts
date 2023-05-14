
import { inject, injectable } from "tsyringe";
import { ICarUseRepository } from "../infra/repositories/ICarUseRepository";
import { CarUse } from "../infra/typeorm/entities/CarUse";

@injectable()
export class ListCarUseService {
  constructor(
      @inject("CarUseRepository")
      private carUseRepository: ICarUseRepository,
  ) {}

  async execute(): Promise<CarUse[]> {
      const carUse = await this.carUseRepository.listCarUse();

      return carUse;
  }
}
