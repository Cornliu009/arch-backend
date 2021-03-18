import analyticsRouter from '../analytics/analyticsRoutes.js';
import userRouter from '../user/userRoutes.js';

export default function routes(app) {
  app.use('/analytics', analyticsRouter);
  app.use('/user', userRouter);

}
