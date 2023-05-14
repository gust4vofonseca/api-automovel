import { IDriverRepository } from "@modules/driver/infra/repositories/IDriverRepository";
import { FakeDriverRepository } from "@modules/driver/infra/repositories/fake/FakeDriverRepository";
import { Driver } from "@modules/driver/infra/typeorm/entities/Driver";
import { CreateDriverService } from "@modules/driver/services/CreateDriverService";
import AppError from "@shared/errors/AppError";
import { v4 as uuidV4 } from 'uuid';

let fakeDriverRepository: IDriverRepository;
let createDriverService: CreateDriverService;
let driver: Driver;

describe("Create driver service test", () => {
    beforeEach(async () => {
      driver = new Driver();
      Object.assign(driver, {
        id: uuidV4(),
        name: "Gustavo",
        document: "135648"
      })

      fakeDriverRepository = new FakeDriverRepository([driver])
      createDriverService = new CreateDriverService(fakeDriverRepository);
    })

    it ("It should be possible to create a driver", async () => {
      const name = "Gustavo";
      const document = "1356478";

      const response = await createDriverService.execute({name, document});

      expect(response.name).toEqual(name);
      expect(response.document).toEqual(document);
    })

    it ("Should give error when trying to save with the same document", async () => {
      const name = "Gustavo";
      const document = "135648";

      await expect(
        createDriverService.execute({name, document})
      ).rejects.toEqual(new AppError(
        'Document already exists!',
        400,
        'create_driver',
      ));
    })
});
