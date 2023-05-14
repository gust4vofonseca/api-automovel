import { ICarDTO } from "@modules/car/dtos/ICarDTO";
import { Car } from "../typeorm/entities/Car";

export interface ICarRepository {
  create(data: ICarDTO): Promise<Car>;
  update(car: Car): Promise<void>;
  deleteById(id: string): Promise<void>;
  findById(id: string): Promise<Car | undefined>;
  findAllCars(): Promise<Car[]>;
  findParms(color?: string, brand?: string): Promise<Car[]>;
  findByPlate(plate: string): Promise<Car | undefined>;
}
