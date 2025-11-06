import express from 'express';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';
import indexRoute from './routes/index.js';

const app = express();
const __filepath = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filepath);
const assetsPath = path.join(__dirname, 'public');
dotenv.config();

app.set('view engine', 'ejs');

app.use(express.static(assetsPath));
app.use('/', indexRoute);

app.listen(process.env.LOCAL_PORT, (err) => {
  if (err) {
    console.log('Server error');
    return;
  }

  console.log('Server Running');
})