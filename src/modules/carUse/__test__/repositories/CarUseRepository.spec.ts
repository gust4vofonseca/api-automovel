import { ICarRepository } from '@modules/car/infra/repositories/ICarRepository';
import { Car } from '@modules/car/infra/typeorm/entities/Car';
import { CarRepository } from '@modules/car/infra/typeorm/repositories/CarRepository';
import { ICarUseDTO } from '@modules/carUse/dtos/ICarUseDTO';
import { ICarUseRepository } from '@modules/carUse/infra/repositories/ICarUseRepository';
import { CarUse } from '@modules/carUse/infra/typeorm/entities/CarUse';
import { CarUseRepository } from '@modules/carUse/infra/typeorm/repositories/CarUseRepository';
import { IDriverRepository } from '@modules/driver/infra/repositories/IDriverRepository';
import { Driver } from '@modules/driver/infra/typeorm/entities/Driver';
import { DriverRepository } from '@modules/driver/infra/typeorm/repositories/DriverRepository';
import { dataSource } from '@shared/infra/typeorm';
import { Repository } from 'typeorm';

let car: Car;
let driver: Driver;
let carUse: CarUse;

describe('Car repository test', () => {
  let ormRepositoryCar: Repository<Car>;
  let ormRepositoryCarUse: Repository<CarUse>;
  let ormRepositoryDriver: Repository<Driver>;


  let carRepository: ICarRepository;
  let carUseRepository: ICarUseRepository;
  let driverRepository: IDriverRepository;

  beforeAll(async () => {
    ormRepositoryCar = dataSource.getRepository(Car);
    ormRepositoryCarUse = dataSource.getRepository(CarUse);
    ormRepositoryDriver = dataSource.getRepository(Driver);

    carRepository = new CarRepository(); 
    carUseRepository = new CarUseRepository(); 
    driverRepository = new DriverRepository(); 

    car = await carRepository.create({
          brand: 'test',
          color: 'test',
          plate: 'test'
    });

    driver = await driverRepository.create({name: "Gustavo", document: "123456"});
  });

  afterAll(async () => {
    await ormRepositoryCarUse.delete({});
    await ormRepositoryCar.delete({});
    await ormRepositoryDriver.delete({});
  });

  it('it should be possible to create the use of the car', async () => {
    const carUseData: ICarUseDTO = {
          car_id: car.id,
          driver_id: driver.id,
          reason_for_use: "Teste",
          start_date: new Date(),
    }
    
    carUse = await carUseRepository.create(carUseData);

    const carsUse = await ormRepositoryCarUse.find();

    expect(carsUse).toHaveLength(1);
    expect(carUse.car_id).toEqual(carUse.car_id);
  });

  it('must be picked up by the car if it is in use', async () => {
    const carUseResponse = await carUseRepository.findByCarAndEndDateNull(car.id);

    const carsUse = await ormRepositoryCarUse.find();

    expect(carsUse).toHaveLength(1);
    expect(carsUse).toContainEqual(carUseResponse);
    expect(carUseResponse.end_date).not.toBeUndefined();
  });

  it('must be picked up by the driver if he is using the car actively', async () => {
    const carUseResponse = await carUseRepository.findByDriverAndEndDateNull(driver.id);

    const carsUse = await ormRepositoryCarUse.find();

    expect(carsUse).toHaveLength(1);
    expect(carsUse).toContainEqual(carUseResponse);
    expect(carUseResponse.end_date).not.toBeUndefined();
  });

  it('it should be possible to upgrade the use of the car', async () => {
    carUse.end_date = new Date();

    await carUseRepository.update(carUse);

    const carsUse = await ormRepositoryCarUse.find();

    expect(carsUse).toHaveLength(1);
  });

  it('it must be possible to obtain use of the car by the driver', async () => {
    const carUseResponse = await carUseRepository.findByDriver(driver.id);

    expect(carUseResponse).toHaveLength(1);
    expect(carUseResponse[0].id).toEqual(carUse.id);
  });


  it('it must be possible to obtain the use of the car by the car', async () => {
    const carUseResponse = await carUseRepository.findByCar(car.id);

    expect(carUseResponse).toHaveLength(1);
    expect(carUseResponse[0].id).toEqual(carUse.id);
  });

  it('it should be possible to get the use of the car by the id', async () => {
    const carUseResponse = await carUseRepository.findById(carUse.id);

    const carsUse = await ormRepositoryCarUse.find();

    expect(carsUse).toHaveLength(1);
    expect(carsUse).toContainEqual(carUseResponse);
  });

  it('it should be possible to get list of all uses of cars', async () => {
    const carUseResponse = await carUseRepository.listCarUse();

    expect(carUseResponse).toHaveLength(1);
  });

  it('it should be possible to delete', async () => {
    await carUseRepository.delete(carUse.id);

    const carsUse = await ormRepositoryCarUse.find();

    const response = await carUseRepository.findById(carUse.id);

    expect(response).toBeUndefined();

    expect(carsUse).toHaveLength(0);
  });

});
