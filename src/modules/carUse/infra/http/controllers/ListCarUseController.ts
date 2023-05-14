import { ListCarUseService } from "@modules/carUse/services/ListCarUseService";
import { Request, Response } from "express";
import { container } from "tsyringe";

export class ListCarUseController {
    async handle(request: Request, response: Response): Promise<Response> {
        const endCarUseService = container.resolve(ListCarUseService);

        const carUse = await endCarUseService.execute();

        return response.status(200).json(carUse);
    }
}
