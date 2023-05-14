import { ICarRepository } from "@modules/car/infra/repositories/ICarRepository";
import { FakeCarRepository } from "@modules/car/infra/repositories/fakes/FakeCarRepository";
import { CreateCarService } from "@modules/car/services/CreateCarService";
import AppError from "@shared/errors/AppError";

let fakeCarRepository: ICarRepository;
let createCarService: CreateCarService;

describe("Create car service test", () => {
  beforeEach(async () => {
    fakeCarRepository = new FakeCarRepository()
    createCarService = new CreateCarService(fakeCarRepository);
  })

  it ("It should be possible to create a car", async () => {
    await createCarService.execute({
      brand: "Fiat",
      plate: "HMT1234",
      color: "Cinza",
    });
  })

  it ("if there is an existing license plate the creation of the car does not occur", async () => {
    await createCarService.execute({
      brand: "Fiat",
      plate: "HMT1234",
      color: "Cinza",
    });

    await expect(
      createCarService.execute({
        brand: "Fiat",
        plate: "HMT1234",
        color: "Cinza",
        })
    ).rejects.toEqual(new AppError(
      'Car already exists!',
      400,
      'create_car',
    ));
  })

});
