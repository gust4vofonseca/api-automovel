import { UpdateCarService } from "@modules/car/services/UpdateCarService";
import AppError from "@shared/errors/AppError";
import { Request, Response } from "express";
import { container } from "tsyringe";

export class UpdateCarController {
    async handle(request: Request, response: Response): Promise<Response> {
        const {
          brand,
          color,
          plate,
          id
        } = request.body;

        if (!brand || !color || !plate || !id) {
          throw new AppError(
            'It is missing parameters!',
            400,
            'update_car',
          );
        }

        const updateCarService = container.resolve(UpdateCarService);

        const car = await updateCarService.execute({
          color,
          plate,
          brand,
          id
        });

        return response.status(200).json(car);
    }
}
