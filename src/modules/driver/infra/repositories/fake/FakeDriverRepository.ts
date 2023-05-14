import { v4 as uuidV4 } from 'uuid';
import { IDriverRepository } from "../IDriverRepository";
import { Driver } from "../../typeorm/entities/Driver";

export class FakeDriverRepository implements IDriverRepository {
    private ormRepository: Driver[] = [];

    constructor(drivers?: Driver[]) {
      this.ormRepository = drivers || [];
    }

    async create(name: string): Promise<Driver> {
        const driver = new Driver();

        Object.assign(driver, {
          id: uuidV4(),
          name
        });

        this.ormRepository.push(driver);

        return driver; 
    }

    async delete(id: string): Promise<void> {
        const drivers = this.ormRepository.filter(driver => driver.id !== id);

        this.ormRepository = drivers;
    }

    async update({id, name}: Driver): Promise<void> {
        this.ormRepository.map(driver => {
          if (driver.id === id) {
              driver.name = name
          }
        });
    }

    async findById(id: string): Promise<Driver | undefined> {
        return this.ormRepository.find(driver => driver.id === id);
    }

    async findByParms(name: string): Promise<Driver[]> {
      return this.ormRepository.filter( driver => name ? driver.name === name : true);

    }


}

