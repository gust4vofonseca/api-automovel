import { FindCarByIdService } from "@modules/car/services/FindCarByIdService";
import { ListCarsByParametersService } from "@modules/car/services/ListCarsByParametersService";
import { Request, Response } from "express";
import { container } from "tsyringe";

export class ListCarsByParametersController {
    async handle(request: Request, response: Response): Promise<Response> {
        const {
          brand,
          color
        } = request.query;

        const listCarsByParametersService = container.resolve(ListCarsByParametersService);

        const cars = await listCarsByParametersService.execute( String(brand), String(color));

        return response.json(cars);
    }
}
