import { v4 as uuidV4 } from 'uuid';
import AppError from "@shared/errors/AppError";
import { FindCarByIdService } from "@modules/car/services/FindCarByIdService";
import { FakeDriverRepository } from "@modules/driver/infra/repositories/fake/FakeDriverRepository";
import { IDriverRepository } from "@modules/driver/infra/repositories/IDriverRepository";
import { Driver } from "@modules/driver/infra/typeorm/entities/Driver";
import { FindDriverByIdService } from "@modules/driver/services/FindDriverByIdService";

let fakeDriverRepository: IDriverRepository;
let findDriverByIdService: FindDriverByIdService;
let driver: Driver;

describe("Find driver by service test", () => {
  beforeEach(async () => {
    driver = new Driver();
    Object.assign(driver, {
      id: uuidV4(),
      name: "Gustavo",
      document: "135648"
    });

    fakeDriverRepository = new FakeDriverRepository([driver]);
    findDriverByIdService = new FindDriverByIdService(fakeDriverRepository);
  })

  it ("it should be possible to search for a driver by id", async () => {
    const data = await findDriverByIdService.execute(driver.id);

    expect(data).toEqual(driver);
  })

  it ("should return an error because there is no driver", async () => {
    await expect(
      findDriverByIdService.execute('1234')
    ).rejects.toEqual(new AppError(
      'Driver does not exist!',
      400,
      'find_driver',
    ));
  })
});
