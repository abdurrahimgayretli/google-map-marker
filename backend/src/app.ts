import 'dotenv/config';
import './clients/db';
import express from 'express';
import Boom from 'boom'
import cors from 'cors';
import routes from './routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(routes);

app.use((req:any, res:any, next:any) => {
  return next(Boom.notFound('This route does not exist.'));
});

app.use((err: any, req: any, res: any, next: any) => {
  console.log(err);

  if (err) {
    if (err.output) {
      return res.status(err.output.statusCode || 500).json(err.output.payload);
    }

    return res.status(500).json(err);
  }
});

app.listen(4000, () => console.log('Server is up!'));
