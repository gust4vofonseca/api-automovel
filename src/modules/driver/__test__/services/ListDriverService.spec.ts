import { v4 as uuidV4 } from 'uuid';
import { FakeDriverRepository } from "@modules/driver/infra/repositories/fake/FakeDriverRepository";
import { IDriverRepository } from "@modules/driver/infra/repositories/IDriverRepository";
import { Driver } from "@modules/driver/infra/typeorm/entities/Driver";
import { ListDriversService } from "@modules/driver/services/ListDriversService";

let fakeDriverRepository: IDriverRepository;
let listDriversService: ListDriversService;
let driver: Driver;

describe("List drivers service test", () => {
  beforeEach(async () => {
    driver = new Driver();
    Object.assign(driver, {
      id: uuidV4(),
      name: "Gustavo",
    });

    fakeDriverRepository = new FakeDriverRepository([driver]);
    listDriversService = new ListDriversService(fakeDriverRepository);
  })

  it ("it should be possible to search for a driver", async () => {
    const data = await listDriversService.execute();

    expect(data).toEqual([driver]);
  })

  it ("it should be possible to search for a driver", async () => {
    const data = await listDriversService.execute(driver.name);

    expect(data).toEqual([driver]);
  })
});
