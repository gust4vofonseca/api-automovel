import { EndCarUseService } from "@modules/carUse/services/EndCarUseService";
import { FindCarUseByDriverService } from "@modules/carUse/services/FindCarUseByDriverService";
import AppError from "@shared/errors/AppError";
import { Request, Response } from "express";
import { container } from "tsyringe";

export class FindCarUseByDriverController {
    async handle(request: Request, response: Response): Promise<Response> {
        const {
          id,
        } = request.query;

        if (!id) {
          throw new AppError(
            'It is missing parameters!',
            400,
            'find_car_use',
          );
        }
        
        const findCarUseByDriverService = container.resolve(FindCarUseByDriverService);

        const carUse = await findCarUseByDriverService.execute(
          String(id)
        );

        return response.status(200).json(carUse);
    }
}
