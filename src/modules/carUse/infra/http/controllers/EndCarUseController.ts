import { EndCarUseService } from "@modules/carUse/services/EndCarUseService";
import AppError from "@shared/errors/AppError";
import { Request, Response } from "express";
import { container } from "tsyringe";

export class EndCarUseController {
    async handle(request: Request, response: Response): Promise<Response> {
        const {
          id,
          end_date
        } = request.body;

        if (!id || !end_date) {
          throw new AppError(
            'It is missing parameters!',
            400,
            'end_car_use',
          );
        }
    

        const endCarUseService = container.resolve(EndCarUseService);

        const carUse = await endCarUseService.execute(
          id,
          end_date
        );

        return response.status(200).json(carUse);
    }
}
