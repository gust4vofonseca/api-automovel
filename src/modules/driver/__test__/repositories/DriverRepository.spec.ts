import { ICarDTO } from '@modules/car/dtos/ICarDTO';
import { ICarRepository } from '@modules/car/infra/repositories/ICarRepository';
import { Car } from '@modules/car/infra/typeorm/entities/Car';
import { CarRepository } from '@modules/car/infra/typeorm/repositories/CarRepository';
import { IDriverRepository } from '@modules/driver/infra/repositories/IDriverRepository';
import { Driver } from '@modules/driver/infra/typeorm/entities/Driver';
import { DriverRepository } from '@modules/driver/infra/typeorm/repositories/DriverRepository';
import { dataSource } from '@shared/infra/typeorm';
import { Repository } from 'typeorm';

let driver: Driver;

describe('Car repository test', () => {
  let ormRepository: Repository<Driver>;

  let driverRepository: IDriverRepository;

  beforeAll(async () => {
    ormRepository = dataSource.getRepository(Driver);

    driverRepository = new DriverRepository();    
  });

  afterAll(async () => {
    await ormRepository.delete({});
  });

  it('it should be possible to create the driver', async () => {  
    const name = "Gustavo";
    const document = "123456"  
    driver = await driverRepository.create({name, document});

    const drivers = await ormRepository.find();

    expect(drivers).toContainEqual(driver);
  });

  it('it should be possible to change the driver', async () => {    
    driver.name = "Gustavo Fonseca";

    await driverRepository.update(driver);

    const drivers = await ormRepository.find();

    expect(drivers).toContainEqual(driver);
  });

  it('it should be possible to search by id', async () => {    
    const driverResponse = await driverRepository.findById(driver.id);

    expect(driverResponse).toEqual(driver);
  });


  it('it should be possible to search by name', async () => {    
    const driverResponse = await driverRepository.findByParms(driver.name);

    expect(driverResponse).toContainEqual(driver);
  });

  it('it should be possible to search by name', async () => {    
    const driverResponse = await driverRepository.findByDocument(driver.document);

    expect(driverResponse).toEqual(driver);
  });

  it('it should be possible to delete', async () => {    
    await driverRepository.delete(driver.id);
  });
});
