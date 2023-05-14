import { IDriverRepository } from "@modules/driver/infra/repositories/IDriverRepository";
import { FakeDriverRepository } from "@modules/driver/infra/repositories/fake/FakeDriverRepository";
import { CreateDriverService } from "@modules/driver/services/CreateDriverService";

let fakeDriverRepository: IDriverRepository;
let createDriverService: CreateDriverService;

describe("Create driver service test", () => {
  beforeEach(async () => {
    fakeDriverRepository = new FakeDriverRepository()
    createDriverService = new CreateDriverService(fakeDriverRepository);
  })

  it ("It should be possible to create a driver", async () => {
    const name = "Gustavo";
    await createDriverService.execute(name);
  })
});
