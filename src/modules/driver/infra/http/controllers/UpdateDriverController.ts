import { UpdateDriverService } from "@modules/driver/services/UpdateDriverService";
import { Request, Response } from "express";
import { container } from "tsyringe";

export class UpdateDriverController {
    async handle(request: Request, response: Response): Promise<Response> {
        const {
          id,
          name,
        } = request.body;

        const updateDriverService = container.resolve(UpdateDriverService);

        await updateDriverService.execute(id, name);

        return response.status(200).send();
    }
}
