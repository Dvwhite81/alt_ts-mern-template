import express, { Express, Request, Response } from 'express';
import 'dotenv/config';
import cors from 'cors';
import logger from 'morgan';
import mongoose from 'mongoose';

const app: Express = express();

app
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use(cors())
  .use(logger('dev'));

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  autoIndex: true,
};
mongoose.connect(process.env.MONGODB_URI as string, options);
mongoose.connection
  .on('error', console.error.bind(console, 'connection error: '))
  .once('open', () => console.log('Connected successfully'));

import AuthRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';

app.use('/auth', AuthRoutes).use('/user', userRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Server connected');
});

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);
