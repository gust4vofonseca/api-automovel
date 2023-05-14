import { v4 as uuidV4 } from 'uuid';
import AppError from "@shared/errors/AppError";
import { IDriverRepository } from "@modules/driver/infra/repositories/IDriverRepository";
import { UpdateDriverService } from "@modules/driver/services/UpdateDriverService";
import { Driver } from "@modules/driver/infra/typeorm/entities/Driver";
import { FakeDriverRepository } from "@modules/driver/infra/repositories/fake/FakeDriverRepository";

let fakeDriverRepository: IDriverRepository;
let updateDriverService: UpdateDriverService;
let driver: Driver;

describe("Update driver service test", () => {
  beforeEach(async () => {
    driver = new Driver();
    Object.assign(driver, {
      id: uuidV4(),
      name: "Gustavo",
    });

    fakeDriverRepository = new FakeDriverRepository([driver]);
    updateDriverService = new UpdateDriverService(fakeDriverRepository);
  })

  it ("It should be possible to change driver information", async () => {
    const id = driver.id;
    const name = "Gustavo Fonseca";

    const response = await updateDriverService.execute(
      id,
      name
    );

    expect(response.name).toEqual(name);
  })

  it ("It should show an error when trying to change non-existent id information", async () => {
    const id = '1425';
    const name = "Gustavo Fonseca";

    await expect(
      updateDriverService.execute(
        id,
        name
      )
    ).rejects.toEqual(new AppError(
      'Driver does not exist!',
      400,
      'update_driver',
    ));
  })

});
