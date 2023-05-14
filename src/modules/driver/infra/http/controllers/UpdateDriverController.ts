import { UpdateDriverService } from "@modules/driver/services/UpdateDriverService";
import AppError from "@shared/errors/AppError";
import { Request, Response } from "express";
import { container } from "tsyringe";

export class UpdateDriverController {
    async handle(request: Request, response: Response): Promise<Response> {
        const {
          id,
          name,
          document
        } = request.body;

        if (!name || !id || !document) {
          throw new AppError(
            'It is missing parameters!',
            400,
            'update_driver',
          );
        }

        const updateDriverService = container.resolve(UpdateDriverService);

        const driver = await updateDriverService.execute({id, name, document});

        return response.status(200).json(driver);
    }
}
