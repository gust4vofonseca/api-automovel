import { CreateCarService } from "@modules/car/services/CreateCarService";
import AppError from "@shared/errors/AppError";
import { Request, Response } from "express";
import { container } from "tsyringe";

export class CreateCarController {
    async handle(request: Request, response: Response): Promise<Response> {
        const {
          brand,
          color,
          plate
        } = request.body;

        if (!brand || !color || !plate) {
          throw new AppError(
            'It is missing parameters!',
            400,
            'create_car',
          );
        }

        const createCarService = container.resolve(CreateCarService);

        const car = await createCarService.execute({
          color,
          plate,
          brand
        });

        return response.status(201).json(car);
    }
}
