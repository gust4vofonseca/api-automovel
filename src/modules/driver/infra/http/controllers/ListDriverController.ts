import { ListDriversService } from "@modules/driver/services/ListDriversService";
import { Request, Response } from "express";
import { container } from "tsyringe";

export class ListDriversController {
    async handle(request: Request, response: Response): Promise<Response> {
        const {
          name,
        } = request.query;

        const nameData = name ? String(name) : undefined;

        const listDriversService = container.resolve(ListDriversService);

        const drivers = await listDriversService.execute(nameData);

        return response.status(200).json(drivers);
    }
}
