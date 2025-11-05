import express from 'express';
import dotenv from 'dotenv';

const app = express();
dotenv.config();

app.listen(process.env.LOCAL_PORT, (err) => {
  if (err) {
    console.log('Server error');
    return;
  }

  console.log('Server Running');
})