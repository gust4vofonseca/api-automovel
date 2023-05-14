import { IsNull, Repository } from "typeorm";
import { ICarUseRepository } from "../../repositories/ICarUseRepository";
import { CarUse } from "../entities/CarUse";
import { dataSource } from "@shared/infra/typeorm";
import { ICarUseDTO } from "@modules/carUse/dtos/ICarUseDTO";

export class CarUseRepository implements ICarUseRepository {
  private ormRepository: Repository<CarUse>;

  constructor() {
    this.ormRepository = dataSource.getRepository(CarUse);
  }

  async create({car_id, driver_id, reason_for_use, start_date}: ICarUseDTO): Promise<CarUse> {
    const carUse = this.ormRepository.create({
      car_id,
      driver_id,
      reason_for_use,
      start_date
    });

    return await this.ormRepository.save(carUse);
  }

  async update(car_use: CarUse): Promise<CarUse> {
    return await this.ormRepository.save(car_use);
  }

  async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }

  async findByCarAndEndDateNull(id: string): Promise<CarUse> {
    const [carUse] = await this.ormRepository.find({
      where: {car_id: id, end_date: IsNull()},
    });

    return carUse;
  }

  async findByDriverAndEndDateNull(id: string): Promise<CarUse> {
    const [carUse] = await this.ormRepository.find({
      where: {end_date: IsNull(), driver_id: id},
    });

    return carUse;
  }

  async findByDriver(id: string): Promise<CarUse[]> {
    return await this.ormRepository.find({
      where: {driver_id: id},
    });
  }

  async findByCar(id: string): Promise<CarUse[]> {
    return await this.ormRepository.find({
      where: {car_id: id},
    });
  }

  async findById(id: string): Promise<CarUse> {
    return await this.ormRepository.findOneBy({id});
  }

  async listCarUse(): Promise<CarUse[]> {
    return await this.ormRepository.find();
  }


}
