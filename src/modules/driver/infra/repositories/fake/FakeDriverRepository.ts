import { v4 as uuidV4 } from 'uuid';
import { IDriverRepository } from "../IDriverRepository";
import { Driver } from "../../typeorm/entities/Driver";
import { ICreateDriverDTO } from '@modules/driver/dtos/ICreateDriverDTO';

export class FakeDriverRepository implements IDriverRepository {
    private ormRepository: Driver[] = [];

    constructor(drivers?: Driver[]) {
      this.ormRepository = drivers || [];
    }

    async create({name, document}: ICreateDriverDTO): Promise<Driver> {
        const driver = new Driver();

        Object.assign(driver, {
          id: uuidV4(),
          name,
          document,
        });

        this.ormRepository.push(driver);

        return driver; 
    }

    async delete(id: string): Promise<void> {
        const drivers = this.ormRepository.filter(driver => driver.id !== id);

        this.ormRepository = drivers;
    }

    async update({id, name, document}: Driver): Promise<Driver> {
        this.ormRepository.map(driver => {
          if (driver.id === id) {
              driver.name = name
              driver.document = document
          }
        });

        return this.ormRepository.find(driver => driver.id === id);
    }

    async findById(id: string): Promise<Driver | undefined> {
        return this.ormRepository.find(driver => driver.id === id);
    }

    async findByParms(name: string): Promise<Driver[]> {
      return this.ormRepository.filter( driver => name ? driver.name === name : true);

    }

    async findByDocument(document: string): Promise<Driver> {
      return this.ormRepository.find(driver => driver.document === document);
    }
}

