import { CreateCarUseService } from "@modules/carUse/services/CreateCarUseService";
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

        const createCarUseService = container.resolve(CreateCarUseService);

        await createCarUseService.execute({
          car_id,
          driver_id,
          reason_for_use,
          start_date: new Date(start_date),
        });

        return response.status(201).send();
    }
}
