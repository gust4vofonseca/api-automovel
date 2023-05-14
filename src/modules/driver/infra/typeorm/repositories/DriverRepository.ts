import { Repository } from "typeorm";
import { IDriverRepository } from "../../repositories/IDriverRepository";
import { Driver } from "../entities/Driver";
import { dataSource } from "@shared/infra/typeorm";
import { ICreateDriverDTO } from "@modules/driver/dtos/ICreateDriverDTO";

export class DriverRepository implements IDriverRepository {
  private ormRepository: Repository<Driver>;

  constructor() {
    this.ormRepository = dataSource.getRepository(Driver);
  }


  async create({name, document}: ICreateDriverDTO): Promise<Driver> {
    const driver = this.ormRepository.create({name, document});

    return await this.ormRepository.save(driver);
  }

  async update(driver: Driver): Promise<Driver> {
    return await this.ormRepository.save(driver);
  }

  async delete(id: string): Promise<void> {
    await this.ormRepository.delete({id});
  }

  async findById(id: string): Promise<Driver> {
    return await this.ormRepository.findOneBy({id});
  }

  async findByParms(name?: string): Promise<Driver[]> {
    return await this.ormRepository.find({
      where: {name}
    })
  }

  async findByDocument(document: string): Promise<Driver> {
    return await this.ormRepository.findOneBy({document});
  }

}
