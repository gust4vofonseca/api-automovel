import { FindCarByIdService } from "@modules/car/services/FindCarByIdService";
import AppError from "@shared/errors/AppError";
import { Request, Response } from "express";
import { container } from "tsyringe";

export class FindCarByIdController {
    async handle(request: Request, response: Response): Promise<Response> {
        const {
          id
        } = request.query;

        if (!id) {
          throw new AppError(
            'It is missing parameters!',
            400,
            'find_car',
          );
        }

        const findCarByIdService = container.resolve(FindCarByIdService);

        const car = await findCarByIdService.execute(String(id));

        return response.json(car);
    }
}
