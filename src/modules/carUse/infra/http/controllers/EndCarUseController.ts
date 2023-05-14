import { EndCarUseService } from "@modules/carUse/services/EndCarUseService";
import { Request, Response } from "express";
import { container } from "tsyringe";

export class EndCarUseController {
    async handle(request: Request, response: Response): Promise<Response> {
        const {
          id,
          end_date
        } = request.body;

        const endCarUseService = container.resolve(EndCarUseService);

        await endCarUseService.execute(
          id,
          end_date
        );

        return response.status(200).send();
    }
}
