import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import { requiredEnv } from './config';
import setupSwagger from './swagger';
import webappRouter from './src/common/webapp';
import accountRouter from './src/user/account';
import usersRouter from './src/user/user';
import gameitemRouter from './src/game/gameitem';
import cropdataRouter from './src/game/cropdata';
import missionRouter from './src/game/mission';

const app = express();
app.use(express.json());

app.use('/webapp', webappRouter);
app.use('/account', accountRouter);
app.use('/users', usersRouter);
app.use('/gameitem', gameitemRouter);
app.use('/cropdata', cropdataRouter);
app.use('/mission', missionRouter);
app.get('/', (_req: Request, res: Response) => res.json({ name: 'setup21portfolio', status: 'ok' }));

setupSwagger(app);

const start = async (): Promise<void> => {
  const port = Number(process.env.PORT || 3000);
  await mongoose.connect(requiredEnv('MONGO_URI'), {
    dbName: process.env.MONGO_DB_NAME || 'setup21portfolio'
  });
  console.log('MongoDB connection established');
  app.listen(port, () => console.log(`Server listening on port ${port}`));
};

start().catch((error: unknown) => {
  console.error('Server startup failed:', error);
  process.exit(1);
});
