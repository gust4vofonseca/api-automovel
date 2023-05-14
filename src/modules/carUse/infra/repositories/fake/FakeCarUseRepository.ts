import { v4 as uuidV4 } from 'uuid';
import { ICarUseRepository } from "../ICarUseRepository";
import { CarUse } from "../../typeorm/entities/CarUse";
import { ICarUseDTO } from "@modules/carUse/dtos/ICarUseDTO";

export class FakeCarUseRepository implements ICarUseRepository {
    private ormRepository: CarUse[] = [];

    constructor(carsUse?: CarUse[]) {
      this.ormRepository = carsUse || [];
    }

    async create({car_id, driver_id, reason_for_use, start_date}: ICarUseDTO): Promise<CarUse> {
      const carUse = new CarUse();

      Object.assign(carUse, {
        id: uuidV4(),
        car_id,
        driver_id,
        reason_for_use,
        start_date
      });

      this.ormRepository.push(carUse);

      return carUse;
    }

    async update({end_date, id}: CarUse): Promise<void> {
      this.ormRepository.map(carUse => {
        if (carUse.id === id) {
          carUse.end_date = end_date;
        }
      });
    }

    async delete(id: string): Promise<void> {
      const carsUse = this.ormRepository.filter(car => car.id !== id);

      this.ormRepository = carsUse;
    }

    async findById(id: string): Promise<CarUse | undefined> {
      const car = this.ormRepository.find(carUse => carUse.id === id);

      return car;
    }

    async findByCarAndEndDateNull(id: string): Promise<CarUse | undefined> {
      const car = this.ormRepository.find(carUse => {if (carUse.car_id === id && carUse.end_date === null) {return carUse}});

      return car;
    }

    async findByDriverAndEndDateNull(id: string): Promise<CarUse | undefined> {
      const car = this.ormRepository.find(carUse => {if (carUse.driver_id === id && carUse.end_date === null) {return carUse}});
      return car;
    }

    async findByDriver(id: string): Promise<CarUse[]> {
      const car = this.ormRepository.filter(carUse => carUse.driver_id === id);

      return car;
    }

    async findByCar(id: string): Promise<CarUse[]> {
      const car = this.ormRepository.filter(carUse => carUse.car_id === id);

      return car;
    }

    async listCarUse(): Promise<CarUse[]> {
      return this.ormRepository;
    }

}

