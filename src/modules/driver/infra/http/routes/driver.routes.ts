import { Router } from "express";
import { CreateDriverController } from "../controllers/CreateDriverController";
import { DeleteDriverController } from "../controllers/DeleteDriverController";
import { UpdateDriverController } from "../controllers/UpdateDriverController";
import { ListDriversController } from "../controllers/ListDriverController";
import { FindDriverByIdController } from "../controllers/FindDriverByIdController";



const driverRouter = Router();

const createDriverontroller = new CreateDriverController();
const deleteDriverontroller = new DeleteDriverController();
const updateDriverontroller = new UpdateDriverController();
const listDriversDriverontroller = new ListDriversController();
const findDriverByIdController = new FindDriverByIdController();


driverRouter.post('/create', createDriverontroller.handle);
driverRouter.delete('/delete', deleteDriverontroller.handle);
driverRouter.patch('/update', updateDriverontroller.handle);
driverRouter.get('/list', listDriversDriverontroller.handle);
driverRouter.get('/find', findDriverByIdController.handle);

export { driverRouter };
