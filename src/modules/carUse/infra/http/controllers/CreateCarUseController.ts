import { CreateCarUseService } from "@modules/carUse/services/CreateCarUseService";
import AppError from "@shared/errors/AppError";
import { Request, Response } from "express";
import { container } from "tsyringe";

export class CreateCarUseController {
    async handle(request: Request, response: Response): Promise<Response> {
        const {
          car_id,
          driver_id,
          reason_for_use,
          start_date
        } = request.body;

        if (!car_id || !driver_id || !reason_for_use || !start_date) {
          throw new AppError(
            'It is missing parameters!',
            400,
            'create_car_use',
          );
        }

        const createCarUseService = container.resolve(CreateCarUseService);

        const carUse = await createCarUseService.execute({
          car_id,
          driver_id,
          reason_for_use,
          start_date: new Date(start_date),
        });

        return response.status(201).json(carUse);
    }
}
