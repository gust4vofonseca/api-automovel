import { Repository } from "typeorm";
import { IDriverRepository } from "../../repositories/IDriverRepository";
import { Driver } from "../entities/Driver";
import { dataSource } from "@shared/infra/typeorm";

export class DriverRepository implements IDriverRepository {
  private ormRepository: Repository<Driver>;

  constructor() {
    this.ormRepository = dataSource.getRepository(Driver);
  }

  async create(name: string): Promise<Driver> {
    const driver = this.ormRepository.create({name});

    await this.ormRepository.save(driver);

    return driver;
  }

  async update(driver: Driver): Promise<void> {
    await this.ormRepository.save(driver);
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

}
