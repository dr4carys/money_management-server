import router from './router';
import express from 'express';


import cors from 'cors';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: '*',
  })
);
app.use(router);
export const App = app;
