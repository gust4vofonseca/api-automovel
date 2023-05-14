import { EndCarUseService } from "@modules/carUse/services/EndCarUseService";
import { FindCarUseByDriverService } from "@modules/carUse/services/FindCarUseByDriverService";
import { Request, Response } from "express";
import { container } from "tsyringe";

export class FindCarUseByDriverController {
    async handle(request: Request, response: Response): Promise<Response> {
        const {
          id,
        } = request.body;

        const findCarUseByDriverService = container.resolve(FindCarUseByDriverService);

        const carUse = await findCarUseByDriverService.execute(
          id
        );

        return response.status(200).json(carUse);
    }
}
