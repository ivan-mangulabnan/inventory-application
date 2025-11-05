import express from 'express';
import dotenv from 'dotenv';
import indexRoute from './routes.js';

const app = express();
dotenv.config();

app.use('/', indexRoute);

app.listen(process.env.LOCAL_PORT, (err) => {
  if (err) {
    console.log('Server error');
    return;
  }

  console.log('Server Running');
})