import { UpdateCarService } from "@modules/car/services/UpdateCarService";
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

        const updateCarService = container.resolve(UpdateCarService);

        await updateCarService.execute({
          color,
          plate,
          brand,
          id
        });

        return response.status(200).send();
    }
}
