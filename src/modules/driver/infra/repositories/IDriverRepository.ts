import { ICreateDriverDTO } from "@modules/driver/dtos/ICreateDriverDTO";
import { Driver } from "../typeorm/entities/Driver";
export interface IDriverRepository {
  create(data: ICreateDriverDTO): Promise<Driver>;
  update(driver: Driver): Promise<Driver>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<Driver | undefined>;
  findByParms(name: string): Promise<Driver[]>;
  findByDocument(document: string): Promise<Driver>;
}
