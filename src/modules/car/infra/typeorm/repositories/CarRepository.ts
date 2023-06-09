import { Repository } from "typeorm";
import { dataSource } from "@shared/infra/typeorm";
import { Car } from "../entities/Car";
import { ICarRepository } from "../../repositories/ICarRepository";
import { ICreateCarDTO } from "@modules/car/dtos/ICreateCarDTO";


export class CarRepository implements ICarRepository {
    private ormRepository: Repository<Car>;

    constructor() {
      this.ormRepository = dataSource.getRepository(Car);
    }

    async create({ brand, color, plate }: ICreateCarDTO): Promise<Car> {
        const car = this.ormRepository.create({
          brand,
          color,
          plate
        });

        return await this.ormRepository.save(car);
    }

    async deleteById(id: string): Promise<void> {
        await this.ormRepository.delete({id});
    }

    async update(car: Car): Promise<Car> {
        return await this.ormRepository.save(car);
    }

    async findById(id: string): Promise<Car> {
        const car = await this.ormRepository.findOneBy({id});

        return car;
    }

    async findAllCars(): Promise<Car[]> {
      return await this.ormRepository.find();
    }

    async findParms(color?: string, brand?: string): Promise<Car[]> {
      return await this.ormRepository.find({
        where: {color, brand},
      });
    }

    async findByPlate(plate: string): Promise<Car | undefined> {
      const car = await this.ormRepository.findOneBy({plate});

      return car;
    }

}
