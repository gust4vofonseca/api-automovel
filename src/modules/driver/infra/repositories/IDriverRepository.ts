import { Driver } from "../typeorm/entities/Driver";


export interface IDriverRepository {
  create(name: string): Promise<Driver>;
  update(driver: Driver): Promise<void>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<Driver | undefined>;
  findByParms(name: string): Promise<Driver[]>;
}
