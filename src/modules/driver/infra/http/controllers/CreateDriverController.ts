import { CreateDriverService } from "@modules/driver/services/CreateDriverService";
import AppError from "@shared/errors/AppError";
import { Request, Response } from "express";
import { container } from "tsyringe";

export class CreateDriverController {
    async handle(request: Request, response: Response): Promise<Response> {
        const {
          name,
          document
        } = request.body;

        if (!name || !document) {
          throw new AppError(
            'It is missing parameters!',
            400,
            'create_driver',
          );
        }

        const createDriverService = container.resolve(CreateDriverService);

        const driver = await createDriverService.execute({name, document});

        return response.status(201).json(driver);
    }
}
