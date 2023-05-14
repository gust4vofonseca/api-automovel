import { DeleteCarService } from "@modules/car/services/DeleteCarService";
import { Request, Response } from "express";
import { container } from "tsyringe";

export class DeleteCarController {
    async handle(request: Request, response: Response): Promise<Response> {
        const {
          id
        } = request.body;

        const deleteCarService = container.resolve(DeleteCarService);

        await deleteCarService.execute(id);

        return response.status(200).send();
    }
}
