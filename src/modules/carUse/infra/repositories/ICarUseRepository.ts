import { ICarUseDTO } from "@modules/carUse/dtos/ICarUseDTO";
import { CarUse } from "../typeorm/entities/CarUse";

export interface ICarUseRepository {
  create(data: ICarUseDTO): Promise<CarUse>;
  update(car_use: CarUse): Promise<void>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<CarUse | undefined>;
  findByCarAndEndDateNull(id: string): Promise<CarUse | undefined>;
  findByDriverAndEndDateNull(id: string): Promise<CarUse | undefined>;
  findByDriver(id: string): Promise<CarUse[]>;
  findByCar(id: string): Promise<CarUse[]>
  listCarUse(): Promise<CarUse[]>;
}
