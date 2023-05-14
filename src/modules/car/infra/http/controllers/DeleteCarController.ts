import { DeleteCarService } from "@modules/car/services/DeleteCarService";
import AppError from "@shared/errors/AppError";
import { Request, Response } from "express";
import { container } from "tsyringe";

export class DeleteCarController {
    async handle(request: Request, response: Response): Promise<Response> {
        const {
          id
        } = request.body;

        if (!id) {
          throw new AppError(
            'It is missing parameters!',
            400,
            'delete_car',
          );
        }

        const deleteCarService = container.resolve(DeleteCarService);

        await deleteCarService.execute(id);

        return response.status(200).send();
    }
}
