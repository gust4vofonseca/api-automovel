import { Router } from "express";
import { CreateCarUseController } from "../controllers/CreateCarUseController";
import { EndCarUseController } from "../controllers/EndCarUseController";
import { ListCarUseController } from "../controllers/ListCarUseController";
import { FindCarUseByDriverController } from "../controllers/FindCarUseByDriverController";


const carUseRouter = Router();

const createCarUseController = new CreateCarUseController();
const endCarUseController = new EndCarUseController();
const listCarUseController = new ListCarUseController();
const findCarUseByDriverController = new FindCarUseByDriverController();

carUseRouter.post('/create', createCarUseController.handle);
carUseRouter.post('/end', endCarUseController.handle);
carUseRouter.get('/list', listCarUseController.handle);
carUseRouter.get('/find', findCarUseByDriverController.handle);

export { carUseRouter };
