import { Router } from 'express';
import busesRouter from '../busesApp/router.js';
import bustoroutesRouter from '../bustoRouteApp/routes.js';
import driverRouter from '../driverApp/router.js';
import infoRouter from '../infoApp/routes.js';
import operatorRouter from '../operatorApp/routes.js';
import routeRouter from '../routeApp/routes.js';
import simulateRouter from '../simulateApp/routes.js';
import accountsRouter from './accountsRouter.js';
import companyRouter from '../companyApp/router.js';
import userRouter from './userRouter.js';

const apiRouter = Router();

apiRouter.use('/operators', operatorRouter);
apiRouter.use('/users', userRouter);
apiRouter.use('/accounts', accountsRouter);
apiRouter.use('/operators', operatorRouter);
apiRouter.use('/companies', companyRouter);
apiRouter.use('/drivers', driverRouter);
apiRouter.use('/buses', busesRouter);
apiRouter.use('/routes', routeRouter);
apiRouter.use('/simulate', simulateRouter);
apiRouter.use('/bus-to-routes', bustoroutesRouter);
apiRouter.use('/info', infoRouter);
apiRouter.use('/company', companyRouter);
export default apiRouter;
