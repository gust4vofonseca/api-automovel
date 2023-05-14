import { FindDriverByIdService } from "@modules/driver/services/FindDriverByIdService";
import { ListDriversService } from "@modules/driver/services/ListDriversService";
import AppError from "@shared/errors/AppError";
import { Request, Response } from "express";
import { container } from "tsyringe";

export class FindDriverByIdController {
    async handle(request: Request, response: Response): Promise<Response> {
        const {
          id,
        } = request.query;

        if (!id) {
          throw new AppError(
            'It is missing parameters!',
            400,
            'find_driver',
          );
        }

        const findDriverByIdService = container.resolve(FindDriverByIdService);

        const driver = await findDriverByIdService.execute(String(id));

        return response.status(200).json(driver);
    }
}
