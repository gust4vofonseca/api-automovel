import { Router } from "express";
import { CreateCarController } from "../controllers/CreateCarController";
import { DeleteCarController } from "../controllers/DeleteCarController";
import { UpdateCarController } from "../controllers/UpdateCarController";
import { ListCarsByParametersController } from "../controllers/ListCarsByParametersController";
import { FindCarByIdController } from "../controllers/FindCarByIdController";


const carRouter = Router();

const createCarontroller = new CreateCarController();
const deleteCarontroller = new DeleteCarController();
const updateCarontroller = new UpdateCarController();
const listCarsByParametersCarontroller = new ListCarsByParametersController();
const FindCarByIdCarontroller = new FindCarByIdController();


carRouter.post('/create', createCarontroller.handle);
carRouter.delete('/delete', deleteCarontroller.handle);
carRouter.patch('/update', updateCarontroller.handle);
carRouter.get('/list', listCarsByParametersCarontroller.handle);
carRouter.get('/find', FindCarByIdCarontroller.handle);

export { carRouter };
