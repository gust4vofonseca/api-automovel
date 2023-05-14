import { ICarDTO } from '@modules/car/dtos/ICarDTO';
import { ICarRepository } from '@modules/car/infra/repositories/ICarRepository';
import { Car } from '@modules/car/infra/typeorm/entities/Car';
import { CarRepository } from '@modules/car/infra/typeorm/repositories/CarRepository';
import { dataSource } from '@shared/infra/typeorm';
import { Repository } from 'typeorm';

let car: Car;

describe('Car repository test', () => {
  let ormRepository: Repository<Car>;

  let carRepository: ICarRepository;

  beforeAll(async () => {
    ormRepository = dataSource.getRepository(Car);

    carRepository = new CarRepository();    
  });

  afterAll(async () => {
    await ormRepository.delete({});
  });

  it('Should be able to create a car', async () => {
    const carData: ICarDTO = {
      brand: "test",
      color: "test",
      plate: "test",
    }
    
    car = await carRepository.create(carData);

    const cars = await ormRepository.find();

    expect(cars).toContainEqual(car);
  });

  it('Must be able to alter a car', async () => {
    car.brand = "Teste Update"
    car.color = "Teste Update"
    car.plate = "Teste Update"
    
    await carRepository.update(car);

    const cars = await ormRepository.find();

    expect(cars).toContainEqual(car);
  });

  it('Must be able to fetch by id', async () => {
    const id = car.id;
    const carResponse = await carRepository.findById(id);

    const cars = await ormRepository.find();

    expect(cars).toContainEqual(carResponse);
  });

  it('Must be able to fetch all', async () => {
    const carResponse = await carRepository.findAllCars();

    expect(carResponse).toContainEqual(car);
  });

  it('Must be able to fetch by parameters', async () => {
    const carResponse = await carRepository.findParms(car.color, car.brand);

    expect(carResponse).toContainEqual(car);
  });

  it('Must be able to search for license plate', async () => {
    const carResponse = await carRepository.findByPlate(car.plate);

    expect(carResponse).toEqual(car);
  });

  it('Must be able to delete', async () => {
    await carRepository.deleteById(car.id);
  });
});
