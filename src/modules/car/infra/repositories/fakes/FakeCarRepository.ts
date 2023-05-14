import { ICarRepository } from "../ICarRepository";
import { ICarDTO } from "@modules/car/dtos/ICarDTO";
import { v4 as uuidV4 } from 'uuid';
import { Car } from "../../typeorm/entities/Car";

export class FakeCarRepository implements ICarRepository {
    private ormRepository: Car[] = [];

    constructor(cars?: Car[]) {
      this.ormRepository = cars || [];
    }

    async create({ brand, color, plate }: ICarDTO): Promise<Car> {
        const car = new Car();

        Object.assign(car, {
          id: uuidV4(),
          brand,
          color,
          plate,
        });

        this.ormRepository.push(car);

        return car;
    }

    async deleteById(id: string): Promise<void> {
        const cars = this.ormRepository.filter(car => car.id !== id);

        this.ormRepository = cars;
    }

    async update({brand, color, plate, id}: Car): Promise<void> {
        this.ormRepository.map(car => {
          if (car.id === id) {
            car.brand = brand;
            car.color = color;
            car.plate = plate;
          }
        });
    }

    async findById(id: string): Promise<Car | undefined> {
        const car = this.ormRepository.find(car => car.id === id);

        return car;
    }

    async findAllCars(): Promise<Car[]> {
      return this.ormRepository;
    }

    async findParms(color: string, brand: string): Promise<Car[]> {
      return this.ormRepository.filter( car => color ? car.color === color : true && brand ? car.brand === brand : true)

    }

    async findByPlate(plate: string): Promise<Car | undefined> {
      const car = this.ormRepository.find(car => car.plate === plate);

      return car;
    }

}

