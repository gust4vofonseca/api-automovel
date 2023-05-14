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

        const brandData = brand ? String(brand) : undefined;
        const colorData = color ? String(color) : undefined;
        
        const listCarsByParametersService = container.resolve(ListCarsByParametersService);

        const cars = await listCarsByParametersService.execute( brandData, colorData);

        return response.json(cars);
    }
}
