import express from 'express';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';
import indexRoute from './routes/index.js';
import productsRoute from './routes/products.js';

const app = express();
dotenv.config();

const __filepath = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filepath);
const assetsPath = path.join(__dirname, 'public');

app.set('view engine', 'ejs');

app.use(express.static(assetsPath));
app.use('/', indexRoute);
app.use('/products', productsRoute);

app.listen(process.env.LOCAL_PORT, (err) => {
  if (err) {
    console.log('Server error');
    return;
  }

  console.log('Server Running');
})