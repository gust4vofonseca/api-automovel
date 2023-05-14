import { CreateDriverService } from "@modules/driver/services/CreateDriverService";
import { Request, Response } from "express";
import { container } from "tsyringe";

export class CreateDriverController {
    async handle(request: Request, response: Response): Promise<Response> {
        const {
          name
        } = request.body;

        const createDriverService = container.resolve(CreateDriverService);

        await createDriverService.execute(name);

        return response.status(201).send();
    }
}
