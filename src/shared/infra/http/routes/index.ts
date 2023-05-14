
import { carRouter } from '@modules/car/infra/http/routes/car.routes';
import { carUseRouter } from '@modules/carUse/infra/http/routes/carUse.routes';
import { driverRouter } from '@modules/driver/infra/http/routes/driver.routes';
import { Router } from 'express';
import 'reflect-metadata';

const router = Router();

router.use('/car', carRouter);
router.use('/driver', driverRouter);
router.use('/car-use', carUseRouter);

export default router;
