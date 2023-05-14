import { Car } from "../typeorm/entities/Car";
import { ICreateCarDTO } from "@modules/car/dtos/ICreateCarDTO";

export interface ICarRepository {
  create(data: ICreateCarDTO): Promise<Car>;
  update(car: Car): Promise<Car>;
  deleteById(id: string): Promise<void>;
  findById(id: string): Promise<Car | undefined>;
  findAllCars(): Promise<Car[]>;
  findParms(color?: string, brand?: string): Promise<Car[]>;
  findByPlate(plate: string): Promise<Car | undefined>;
}
