import { CreateCarService } from "@modules/car/services/CreateCarService";
import { Request, Response } from "express";
import { container } from "tsyringe";

export class CreateCarController {
    async handle(request: Request, response: Response): Promise<Response> {
        const {
          brand,
          color,
          plate
        } = request.body;

        const createCarService = container.resolve(CreateCarService);

        await createCarService.execute({
          color,
          plate,
          brand
        });

        return response.status(201).send();
    }
}
